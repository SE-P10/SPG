import gApi from "./api/gAPI.js";
import ordersApi from "./api/orders.js";
import farmerAPI from "./api/farmer.js";
import userAPI from "./api/user.js";
import testAPI from "./api/testAPI.js";

/**
 * USER API
 */

async function logIn(credentials) {
  let response = await fetch("/api/sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  if (response.ok) {
    const user = await response.json();
    return user;
  } else {
    try {
      const errDetail = await response.json();
      throw errDetail.message;
    } catch (err) {
      throw err;
    }
  }
}

async function logOut() {
  await fetch("/api/sessions/current", { method: "DELETE" });
}

/* Function for setting the day of the week and the hour.
   Takes an object like { weekDay: "monday", hour: 16 } to change day of the week and time.
   Default parameter is used to end the debug session (the function is called without arguments) */
async function setTime(newTime = { weekDay: "endDebug", hour: 0 }) {
  return new Promise((resolve, reject) => {
    fetch("/api/debug/time/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTime),
    })
      .then((response) => {
        if (response.ok) {
          resolve(null);
        } else {
          response
            .json()
            .then((message) => {
              reject(message);
            }) // error message in the response body
            .catch(() => {
              reject({ error: "Impossible to read server response." });
            }); // something else
        }
      })
      .catch(() => {
        reject({ error: "Impossible to communicate with the server." });
      }); // connection errors
  });
}

async function getOrders(client_email) {
  const response = await fetch("/api/orders/" + client_email, {
    method: "GET",
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw response.json();
  }
}

async function getUserInfo(userID) {
  const response = await (userID
    ? fetch("/api/user/" + userID)
    : fetch("/api/sessions/current"));
  const userInfo = await response.json();

  if (response.ok) {
    return userInfo;
  } else {
    throw userInfo;
  }
}

async function updateWallet(amount, client_email) {
  const response = await fetch("/api/wallet/update/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: amount,
      client_email: client_email,
    }),
  });
  if (response.ok) {
    return await response.json();
  } else {
    throw await response.json();
  }
}

const API = {
  ...ordersApi,
  ...gApi,
  ...farmerAPI,
  ...userAPI,
  ...testAPI,
  logIn,
  logOut,
  getUserInfo,
  setTime,
  updateWallet,
  getOrders,
};

export default API;
