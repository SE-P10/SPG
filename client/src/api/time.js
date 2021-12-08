import { handleFetch, parseResponse } from "./utility";
import dayjs from 'dayjs';

/**
 * Frontend interface API
 * 
 * Handle Virtual clock time in user session
 * accepts both datetime '2021-12-07' and unix timestamp (milliseconds or not)
 * 
 * @returns {Boolean} 
 */
async function setTime(time = 0) {
    return parseResponse(
        await handleFetch("/api/debug/time/" + time, {}, "PUT"),
        "number"
    );
}

/**
 * Return virtual timestamp or an offset from real one
 * 
 * @param {Boolean} offset 
 * @returns 
 */
async function getTime(offset = false) {

    let virtualTime = await handleFetch("/api/debug/time/", {}, "GET");

    return parseResponse((offset ? virtualTime.offset : virtualTime.time), "number", (offset ? 0 : dayjs().unix()));
}

const timeApi = {
    setTime,
    getTime
};

export default timeApi;