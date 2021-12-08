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

    weekdays: {
        MONDAY: 'Mo',
        TUESDAY: 'Tu',
        WEDNESDAY: 'We',
        THURSDAY: 'Th',
        FRIDAY: 'Fr',
        SATURDAY: 'Sa',
        SUNDAY: 'Su'
    },

    times: {
        ONCE_A_SECOND: 1,
        ONCE_A_MINUTE: 60,
        ONCE_A_HOUR: 3600,
        TWICE_A_DAY: 43200,
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

    calcDateDiff: function (date1, date2) {

        let utc1 = Date.UTC(date1.year(), date1.month(), date1.date());
        let utc2 = Date.UTC(date2.year(), date2.month(), date2.date());

        return Math.floor(Math.abs(utc2 - utc1) / (this.times.ONCE_A_DAY * 1000));
    },

    /**
     * 
     * @param {*} weekday 
     * @returns {Integer} 0 to 6
     */
    weekdayToNumber: function (weekday) {

        let value = 0;

        for (let key in this.weekdays) {

            if (weekday === this.weekdays[key] || weekday === key) {
                break;
            }

            value++;
        }

        return value;
    },

    exec: function (virtualTime) {

        let crons = removeEmpty(this.activity, {}, true);

        /**
         * Try to run those events
        */
        for (let key in crons) {

            let cron = crons[key];

            // fix removeEmpty with time=0
            cron.time = cron.time || 0;

            let allowExec = false;

            if (isNumber(cron.interval)) {
                allowExec = (cron.time + cron.interval) <= virtualTime;
            }
            else if (cron.time <= virtualTime) {

                let vtime = dayjs.unix(virtualTime);

                // last execution time
                let calltime = dayjs.unix(cron.time);

                // clac how many days are from last execution and scheduled execution
                let dispathRealExecution = this.weekdayToNumber(calltime.format("dd")) - this.weekdayToNumber(cron.interval);

                // fix future relative problems
                if (dispathRealExecution < 0) {
                    dispathRealExecution = 0;
                }

                // last execution time if on scheduled day
                let ctime = calltime.subtract(dispathRealExecution, 'day');

                allowExec = this.calcDateDiff(ctime, vtime) >= 7 || vtime.format("dd") === cron.interval;
            }

            if (allowExec) {

                // try to exec the callback
                if (cron.callback) {

                    cron.callback = eval('(' + cron.callback + ')');

                    cron.callback(virtualTime, ...(cron.args || []));
                }

                console.log("RUNNING CRON", vtime.format('YYYY-MM-DD <HH:mm:ss>'), args);

                // auto reschedule based on saved cron data
                this.set(key, cron.once ? null : { ...cron, time: virtualTime }, true);
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

    schedule: function (callback, interval, args, once = true, time = 0) {

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

    schedules: { ...cronClass.weekdays, ...cronClass.times },

    init: async function (callback = null) {

        await cronClass.load();

        if (callback) {
            callback();
        }

        await cronClass.save();
    },

    /**
     * 
     * @param {Function} callback 
     * @param {Number} virtualTimeOffset
     * @returns {Function}
     */
    run: function (callback = null, virtualTimeOffset = 0) {

        let cronLoaded = false;

        this.init(callback).then(() => {
            cronLoaded = true;
        });

        /**
         * return a middleware for express server
        */
        return (req, res, next) => {

            if (cronLoaded) {

                // calc virtual time
                cronClass.exec(Number.parseInt(virtualTimeOffset) + dayjs().unix());

                if (callback) {
                    callback()
                }

                cronClass.save();
            }

            next();
        };
    },

    schedule: (interval, callback, args, once = true, time = 0) => {

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
