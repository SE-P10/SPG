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

        default:
            break;
    }

    return response;
}


export { handleFetch, parseResponse }