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
    console.log("utility")

    return new Promise((resolve, reject) => {
        fetch(endpoint, request)
            .then(async (response) => {
                console.log("promise")
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
                console.log("promise catch")

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


const calcDateDiff = (date1, date2) => {

    let utc1 = Date.UTC(date1.year(), date1.month(), date1.date());
    let utc2 = Date.UTC(date2.year(), date2.month(), date2.date());

    return Math.floor(Math.abs(utc2 - utc1) / (this.times.ONCE_A_DAY * 1000));
}

const getNextWeekday = (time, weekday = 1, changeWeek = true) => {

    const skip = changeWeek ? 7 : 0;

    return time.add((((weekday + skip - time.weekday() + 1) % 7) || skip), 'day');
}

export { handleFetch, parseResponse, getNextWeekday }