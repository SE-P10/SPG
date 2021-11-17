
import dayjs from "dayjs";
import gApi from "./gAPI.js"
import AFApi from "./api/a-API.js"
import farmerAPI from './api/farmer-API.js'

function getJson(httpResponsePromise) {
  return new Promise((resolve, reject) => {
    httpResponsePromise
      .then((response) => {
        if (response.ok) {
          // always return {} from server, never null or non json, otherwise it will fail
          response
            .json()
            .then((json) => resolve(json))
            .catch((err) => reject({ error: "Cannot parse server response" }));
        } else {
          // analyze the cause of error
          response
            .json()
            .then((obj) => reject(obj)) // error msg in the response body
            .catch((err) => reject({ error: "Cannot parse server response" })); // something else
        }
      })
      .catch((err) => reject({ error: "Cannot communicate" })); // connection error
  });
}

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

async function getOrders(client_email) {
  const response = await fetch("/api/orders/" + client_email, { method: "GET" });

  if (response.ok) {
    return await response.json();
  } else {
    return {};
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
  ...AFApi,
  ...gApi,
  ...farmerAPI,
  logIn,
  logOut,
  getUserInfo,
  updateWallet,
  getOrders,
};

export default API;
