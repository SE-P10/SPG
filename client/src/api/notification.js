import { handleFetch, parseResponse } from "./utility";

/**
 *
 * @param {Number} userID
 * @returns {Array} [{id:0, message: '', object: '', seen:0}, ...]
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
 * @param {Number} notificationID
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
async function insertNotification(userID, message, object = '') {
    return parseResponse(
        await handleFetch("/api/notification/" + userID, { message: message, object: object }, "POST"),
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