"use strict";

const VC_DEBUG = true;

const dayjs = require("dayjs");
const md5 = require("md5");

const db = require("./db");
const { getVirtualTimestamp } = require("./time");
const {
  json,
  getQuerySQL,
  removeEmpty,
  runQuerySQL,
  isNumber,
  isObject,
} = require("./utility");


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
    MONDAY: "Mo",
    TUESDAY: "Tu",
    WEDNESDAY: "We",
    THURSDAY: "Th",
    FRIDAY: "Fr",
    SATURDAY: "Sa",
    SUNDAY: "Su",
  },

  times: {
    ONCE_A_SECOND: 1,
    ONCE_A_MINUTE: 60,
    ONCE_A_HOUR: 3600,
    TWICE_A_DAY: 43200,
    ONCE_A_DAY: 86400,
    ONCE_A_WEEK: 604800,
    ONCE_A_MONTH: 2592000,
  },

  load: async function () {
    let crons = await getQuerySQL(db, "SELECT * FROM options WHERE name = ?", ["cron"], { id: 0, name: "", value: "", }, null, true);

    if (crons) {
      this.activity = json.parse(crons.value, {});
    } else {
      /**
       * reset database on db error
       */
      await runQuerySQL(
        db,
        "DELETE FROM options WHERE name = 'cron'",
        [],
        true
      );

      await runQuerySQL(
        db,
        "INSERT INTO options (name, value) VALUES ('cron', '{}')",
        [],
        true
      );
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

  isBetween: function (weekday0, weekday1, weekday2) {
    let wd0N = this.weekdayToNumber(weekday0);
    let wd1N = this.weekdayToNumber(weekday1);
    let wd2N = this.weekdayToNumber(weekday2);

    if (wd2N < wd1N) {
      return !(wd0N > wd2N && wd0N < wd1N);
    }

    return wd0N >= wd1N && wd0N <= wd2N;
  },

  isBefore: function (weekday1, weekday2) {
    let wd1N = this.weekdayToNumber(weekday1);
    let wd2N = this.weekdayToNumber(weekday2);

    return wd1N < wd2N;
  },

  exec: function (virtualTime) {
    let crons = removeEmpty(this.activity, {}, true);

    let vtime = dayjs.unix(virtualTime);

    /**
     * Try to run those events
     */
    for (let key in crons) {
      let cron = crons[key];

      // fix removeEmpty with time=0
      cron.time = cron.time || 0;

      let allowExec = false;

      // last execution time
      let lastCallTime = dayjs.unix(cron.time);

      if (isNumber(cron.interval)) {
        allowExec = cron.time + cron.interval <= virtualTime;
      } else if (cron.time + 3 <= virtualTime) {

        if (isObject(cron.interval)) {

          let execFrom = cron.interval.from;
          let execTo = cron.interval.to;

          if (execFrom.day && execTo.day) {

            // 2part checks if last call has been run on last day call
            allowExec = this.isBetween(vtime.format("dd"), execFrom.day, execTo.day) || this.isBefore(lastCallTime.format("dd"), execTo.day);

            if (allowExec && execFrom.hour && execTo.hour) {
              if (vtime.format("dd") === execFrom.day) {
                allowExec = vtime.hour() >= execFrom.hour;
              }

              if (vtime.format("dd") === execTo.day) {
                allowExec = allowExec && vtime.hour() <= execTo.hour;
              }
            }
          } else if (execFrom.hour && execTo.hour) {
            allowExec =
              vtime.hour() >= execFrom.hour && vtime.hour() <= execTo.hour;
          }

          if (!allowExec) {

          }
        } else {
          allowExec = vtime.format("dd") === cron.interval;
        }

        if (!allowExec) {

          // calc how many days are from last execution and scheduled execution
          let dispathRealExecution = this.calcDateDiff(lastCallTime, vtime);

          // fix future relative problems
          if (dispathRealExecution < 0) {
            dispathRealExecution = 0;
          }

          // last execution time if on scheduled day
          let lastScheduledCallTime = lastCallTime.subtract(dispathRealExecution, "day");

          allowExec = this.calcDateDiff(lastScheduledCallTime, vtime) >= 7;
        }
      }

      if (allowExec) {
        // try to exec the callback
        if (cron.callback) {

          if (VC_DEBUG) {
            console.log("\nRUNNING CRON JOB. Last call:", lastCallTime.format("YYYY-MM-DD <HH:mm:ss>"), "virtual time:", vtime.format("YYYY-MM-DD <HH:mm:ss>"), cron.args || []);
          }

          if (typeof cron.callback === "function") {
            cron.callback(vtime, lastCallTime, ...(cron.args || []));
          } else {
            const evaler = new Function(
              eval("'use strict'; ( " + cron.callback + ")")(
                lastCallTime,
                ...(cron.args || [])
              )
            );

            evaler.call(cron.env);
          }
        }

        if (VC_DEBUG) {
          console.log("\n");
        }

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
    } else {
      this.activity = {};
    }

    return true;
  },

  hash: function (callback, args) {
    return md5(callback.toString() + json.stringify(args) || "");
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

  schedule: function (
    callback,
    interval,
    args,
    once = true,
    time = 0,
    env = null
  ) {
    let hook = this.hash(callback, args);

    let oldCron = this.getHook(hook);

    /**
     * if null lets overwite
     */
    return this.set(
      hook,
      {
        time: time || dayjs().unix(),
        interval: interval || this.ONCE_A_DAY,
        callback: callback,
        args: args,
        env: env,
        once: once,
      },
      oldCron === null || interval !== oldCron.interval || true
    );
  },

  dump: function () {
    console.log(Object.keys(this.activity).length, this.activity);
  },

  save: async function () {
    if (!this.activity) {
      this.activity = {};
    }

    let cron,
      cronData = {};

    for (let key in this.activity) {
      if (!this.activity[key]) {
        continue;
      }

      cron = { ...this.activity[key] };

      // serialize the callback .replace(/(?:\r\n|\r|\n)/g, "").replace(/\s+/g, " ");
      cron.callback = cron.callback.toString();

      cronData[key] = cron;
    }

    cronData = json.stringify(cronData);

    let sql = "UPDATE options SET value = ? WHERE name = 'cron';";

    return await runQuerySQL(db, sql, [cronData], true);
  },
};

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
   * @param {Function} setUp
   * @param {Function} updateVirtualTimeOffset
   * @returns {Function}
   */
  run: function (setUp = null) {
    let cronLoaded = false;

    this.init(setUp).then(() => {
      cronLoaded = true;
    });

    /**
     * return a middleware for express server
     */
    return (req, res, next) => {
      if (cronLoaded) {
        // calc virtual time
        cronClass.exec(getVirtualTimestamp(req, false, true).unix());

        cronClass.save();
      }

      next();
    };
  },

  schedule: (interval, callback, args, once = true, time = 0, env = null) => {
    return cronClass.schedule(callback, interval, args, once, time, env);
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
  },

  calcDateDiff: (date1, date2) => {
    return cronClass.calcDateDiff(date1, date2);
  },
};
