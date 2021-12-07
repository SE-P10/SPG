'use strict';

const dayjs = require("dayjs");
const md5 = require('md5');

const db = require("./db");
const { json, getQuerySQL, removeEmpty, runQuerySQL, isNumber } = require("./utility");

const cronClass = {

    /**
     * {
     *   hook => {
     *              time : 0,
     *              callback,
     *              args: [],
     *              interval: ONCE_A_DAY
     *           }
     * }
    */
    activity: {},

    times: {
        MONDAY: 'Mo',
        TUESDAY: 'Tu',
        WEDNESDAY: 'We',
        THURSDAY: 'Th',
        FRIDAY: 'Fr',
        SATURDAY: 'Sa',
        SUNDAY: 'Su',
        ONCE_A_SECOND: 1,
        ONCE_A_MINUTE: 60,
        ONCE_A_HOUR: 3600,
        TWICE_A_DAY: 23200,
        ONCE_A_DAY: 86400,
        ONCE_A_WEEK: 604800,
        ONCE_A_MONTH: 2592000
    },

    load: async function () {

        let crons = await getQuerySQL(db, "SELECT * FROM options WHERE name = ?", ['cron'], {
            id: 0,
            name: '',
            value: ''
        }, null, true);

        if (crons) {
            this.activity = json.parse(crons.value, {});
        } else {

            /**
             * reset database
             */
            await runQuerySQL(db, "DELETE FROM options WHERE name = 'cron'", [], true);

            await runQuerySQL(db, "INSERT INTO options (name, value) VALUES ('cron', '{}')", [], true);
        }
    },

    set: function (hook, cron, force = false) {

        if (!force && hook in this.activity) {
            return false;
        }

        this.activity[hook] = cron;

        return true;
    },

    exec: function (virtualTime = null) {

        let virtualDAYJS = virtualTime ? dayjs.unix(virtualTime) : dayjs();

        let cron, crons = removeEmpty(this.activity, {}, true);

        /**
         * Try to run those events
        */
        for (let key in crons) {

            cron = crons[key];

            let allowExec;

            if (isNumber(cron.interval)) {
                allowExec = (cron.time + cron.interval) <= virtualDAYJS.unix();
            }
            else {
                allowExec = (virtualDAYJS.format("dd") === cron.interval) && cron.time <= virtualDAYJS.unix();
            }

            if (allowExec) {

                // try to exec the callback
                if (cron.callback) {

                    cron.callback = eval('(' + cron.callback + ')');

                    cron.callback(virtualDAYJS.unix(), ...(cron.args || []));
                }

                // auto reschedule based on saved cron data
                // if is week schedule skip to next one
                this.set(key, cron.once ? null : { ...cron, time: cron.time + (isNumber(cron.interval) ? 0 : this.times.ONCE_A_WEEK) }, true);
            }
        }
    },

    removeHook: function (hook = null) {

        if (hook) {

            if (!(hook in this.activity)) {
                return false;
            }

            this.activity[hook] = null;
        }
        else {
            this.activity = {}
        }

        return true;
    },

    hash: function (callback, args) {

        return md5((callback.toString() + json.stringify(args)) || '');
    },

    hookExist: function (hook) {
        return this.activity[hook] !== undefined;
    },

    getHook: function (hook) {

        if (this.hookExist(hook)) {
            return this.activity[hook];
        }

        return false;
    },

    schedule: function (callback, interval, args, once = true, time = null) {

        if (!time) {
            time = dayjs().unix();
        }

        let hook = this.hash(callback, args);

        let oldCron = this.getHook(hook);

        /**
         * if null lets overwite
        */
        return this.set(hook, {
            time: time,
            interval: interval || this.ONCE_A_DAY,
            callback: callback,
            args: args,
            once: once
        }, oldCron === null || interval !== oldCron.interval);
    },

    dump: function () {
        console.log(Object.keys(this.activity).length, this.activity)
    },

    save: async function () {

        if (!this.activity) {
            this.activity = {};
        }

        let cron, cronData = {};

        for (let key in this.activity) {

            cron = this.activity[key];

            if (!cron) {
                continue;
            }

            // serialize the callback
            cron.callback = cron.callback.toString().replace(/(?:\r\n|\r|\n)/g, "").replace(/\s+/g, " ");

            cronData[key] = cron;
        }

        cronData = json.stringify(cronData);

        let sql = "UPDATE options SET value = ? WHERE name = 'cron';";

        return await runQuerySQL(db, sql, [cronData], true);
    }
}

/**
 * External interface for cronjobs simulator 
*/
exports.virtualCron = {

    times: { ...cronClass.times },

    init: async function (callback = null, virtualTime = null) {

        await cronClass.load();

        if (callback) {
            callback();
        }

        await cronClass.save();
    },

    /**
     * 
     * @param {Function} callback 
     * @returns {Function}
     */
    run: function (callback = null, virtualTime = null) {

        let cronLoaded = false;

        this.init(callback, virtualTime).then(() => {
            cronLoaded = true;
        });

        /**
         * return a middleware for express server
        */
        return (req, res, next) => {

            if (cronLoaded) {

                cronClass.exec(virtualTime);

                if (callback) {
                    callback()
                }

                cronClass.save();
            }

            next();
        };
    },

    schedule: (interval, callback, args, time = 0, once = true) => {

        return cronClass.schedule(callback, interval, args, once, time);
    },

    unschedule: (callback, args) => {

        let hook = cronClass.hash(callback, args);

        return cronClass.removeHook(hook);
    },

    unscheduleAll: () => {
        return cronClass.removeHook();
    },

    debug: () => {
        cronClass.dump();
    }
}
