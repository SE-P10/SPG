import { handleFetch, parseResponse } from "./utility";

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


async function getTime() {
    return parseResponse(
        await handleFetch("/api/debug/time/", {}, "GET"),
        "number"
    );
}

const timeApi = {
    setTime,
    getTime
};

export default timeApi;