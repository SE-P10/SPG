const dayjs = require("dayjs");

const weekOfYear = require('dayjs/plugin/weekOfYear')
dayjs.extend(weekOfYear)

const weekday = require('dayjs/plugin/weekday')
dayjs.extend(weekday)

async function handleFetch(endpoint, body = {}, method = "POST") {

    let request;

    switch (method) {
        case "HEAD":
        case "GET":
            request = {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
            };
            break;

        default:
            request = {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            };
            
    }

    return new Promise((resolve, reject) => {
        fetch(endpoint, request)
            .then(async (response) => {
                try {
                    let parsed = await response.json();
                    if (response.ok) {
                        resolve(parsed);
                    } else {
                        reject(parsed);
                    }
                } catch (e) {
                    reject({ error: "Impossible to read server response." });
                }
            })
            .catch(() => {

                reject({ error: "Impossible to communicate with the server." });
            });
    });
}

/**
 * 
 * @param {*} response 
 * @param {String} type 
 * @param {Boolean} falseRes 
 * @returns {*}
 */
async function parseResponse(response, type = "boolnum", falseRes = false) {
    response = await response;

    switch (type) {
        case "number":
        case "boolean":
        case "boolnum":
            if (typeof response === "object") response = falseRes;
            break;

        case "array":
            if (!response || !Array.isArray(response)) response = falseRes;
            break;

        case "object":
            if (!response || typeof response !== 'object') response = falseRes;
            break;

        default:
            break;
    }

    return response;
}

const getNextWeekday = (time, weekdayX = 1, changeWeek = true) => {

    const skip = changeWeek ? 7 : 0;

    return time.add((((weekdayX + skip - time.weekday() + 1) % 7) || skip), 'day');
}

const dateIsBetween = (cDate, date1, date2) => {

    let wd0N = cDate.weekday();
    let wd1N = date1.weekday();
    let wd2N = date2.weekday();

    if (wd2N < wd1N) {
        return !(wd0N > wd2N && wd0N < wd1N);
    }

    return wd0N >= wd1N && wd0N <= wd2N;
}

export { handleFetch, parseResponse, getNextWeekday, dateIsBetween }
