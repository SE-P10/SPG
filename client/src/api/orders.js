import { handleFetch, parseResponse } from "./utility";

/**
 * Handle server communication
 *
 * @param {Number | String} filter
 * @param {Array} products
 * @param {Object} order_details
 * @param {String} method
 * @returns {*}
 */
async function handleOrderAction(filter, products = [], order_details = {}, method = "POST") {

  if (typeof order_details === "number") {
    order_details = { id: order_details };
  }
  else {
    order_details = Object.assign({ id: 0 }, order_details);
  }

  return await handleFetch("/api/orders/" + filter, { products: products, order: order_details }, method)
}

/**
 *
 * @param {Number | String} filter user_email|orderID|order_status
 * @returns {Array} [{ id: 0, user_id: 0, status: '', price: 0, pickup_time: '', pickup_place: '', 'user':{id: 0, username: '', email: '', name: '', surname: ''}, 'products': [{order_id: 0,product_id: '', quantity: 0}]}, ...]
 */
async function getOrders(filter) {
  return parseResponse(
    await handleOrderAction(filter, [], {}, "GET"),
    "array",
    []
  );
}

/**
 *
 * @param {Number } filter orderID
 * @returns {Object} { id: 0, user_id: 0, status: '', price: 0, pickup_time: '', pickup_place: '', 'user':{id: 0, username: '', email: '', name: '', surname: ''}, 'products': [{order_id: 0,product_id: '', quantity: 0}]}
 */
async function getOrder(orderID) {
  return parseResponse(
    await handleOrderAction(orderID, [], {}, "GET"),
    "object",
    []
  );
}

/**
 * Frontend interface API
 * 
 * @returns {Array} orders in pending status
 */
async function getPendingOrders() {
  return getOrders("pending");
}

/**
 * Frontend interface API
 *
 * @param {Number} orderID
 * @returns {boolean} true|false
 */
async function handOutOrder(orderID = 0) {
  return parseResponse(
    await handleOrderAction(orderID, [], { id: orderID, status: "handout" }, "PUT")
  );
}
/**
 * Frontend interface API
 *
 * @param {number} userID
 * @param {Array} products
 * @param {Object} order_details
 * @returns {boolean} true|false
 */
async function insertOrder(userID, products = [], order_details = {}) {
  return parseResponse(
    await handleOrderAction(userID, products, order_details, "POST")
  );
}

/**
 * Frontend interface API
 *
 * @param {Number} farmerID
 * @returns {Array} [{id: 2, quantity: 5, name: 'apple'}]
 */
async function getRequestedProducts(farmerID) {
  return parseResponse(
    await handleFetch("/api/orders/products/farmer/" + farmerID, {}, "GET"), 'array');
}


/**
 * Frontend interface API
 *
 * @param {Number} orderID
 * @param {String} time
 * @param {String} place
 * @returns {boolean} true|false
 */
 async function deliveryOrder(orderID, time, place = 'local') {
  return parseResponse(
    await handleOrderAction(orderID, [], { id: orderID, pickup_time: time, pickup_place: place}, "PUT")
  );
}


/**
 * Frontend interface API
 *
 * @param {Number} orderID
 * @param {Array} products 
 * @returns {boolean} true|false
 */
 async function updateOrderProducts(orderID, products = []) {
  return parseResponse(
    await handleOrderAction(orderID, products, { id: orderID }, "PUT")
  );
}

const ordersApi = {
  insertOrder,
  handOutOrder,
  getPendingOrders,
  getOrders,
  getOrder,
  deliveryOrder,
  updateOrderProducts,
  getRequestedProducts
};

export default ordersApi;