import productsAPI from "./api/products.js";
import ordersApi from "./api/orders.js";
import farmerAPI from "./api/farmer.js";
import userAPI from "./api/user.js";
import testAPI from "./api/testAPI.js";
import walletAPI from "./api/wallet.js";
import timeAPI from "./api/time.js";
import notificationAPI from "./api/notification";
import warehouseAPI from "./api/warehouse";

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
    return await response.json();
  } else {
    try {
      const errDetail = await response.json();
      throw errDetail.message;
    } catch (err) {
      console.log(err)
      throw err;
    }
  }
}

async function logOut() {
  await fetch("/api/sessions/current", { method: "DELETE" });
}

async function getUserInfo(userID) {
  const response = await (userID
    ? fetch("/api/users/" + userID)
    : fetch("/api/sessions/current"));
  const userInfo = await response.json();

  if (response.ok) {
    return userInfo;
  } else {
    throw userInfo;
  }
}

const API = {
  ...ordersApi,
  ...productsAPI,
  ...farmerAPI,
  ...userAPI,
  ...testAPI,
  ...walletAPI,
  ...notificationAPI,
  ...timeAPI,
  ...warehouseAPI,
  logIn,
  logOut,
  getUserInfo,
};

export default API;
