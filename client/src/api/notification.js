import { handleFetch, parseResponse } from "./utility";

/**
 *
 * @param {Number} filter userID
 * @returns {Array} [{id:0, text: '', seen:0}, ...]
 */
async function getNotification(userID) {
    return parseResponse(
        await handleFetch("/api/notification/" + userID, {}, "GET"),
        "array",
        []
    );
}

/**
 *
 * @param {Number} filter notificationID
 * @returns {Boolean} 
 */
async function setSeenNotification(notificationID) {
    return parseResponse(
        await handleFetch("/api/notification/" + notificationID, {}, "PUT"),
        "boolean",
        []
    );
}

/**
 *
 * @param {Number} userID 
 * @param {String} message
 * @returns {Boolean} 
 */
async function insertNotification(userID, message) {
    return parseResponse(
        await handleFetch("/api/notification/" + userID, { text: message }, "POST"),
        "boolean",
        []
    );
}


const notificationAPI = {
    setSeenNotification,
    insertNotification,
    getNotification,
};

export default notificationAPI;