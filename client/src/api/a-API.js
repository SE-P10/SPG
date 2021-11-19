'use strict';

/**
 * Handle server communication
 * 
 * @param {*} filter 
 * @param {*} products 
 * @param {*} order_details 
 * @param {*} method 
 * @returns miscellaneous
 */
async function handleOrderAction(filter, products = [], order_details = {}, method = 'POST') {

	if (typeof order_details === 'number')
		order_details = { id: order_details };
	else
		order_details = Object.assign({ id: 0 }, order_details)

	let request;

	switch (method) {
		case 'HEAD':
		case 'GET':
			request = {
				method: method,
				headers: {
					'Content-Type': 'application/json',
				},
			};
			break;

		default:
			request = {
				method: method,
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ products: products, order: order_details })
			}
	}

	return new Promise((resolve, reject) => {
		fetch('/api/orders/' + filter, request).then(async (response) => {

			try {
				let parsed = await response.json();
				if (response.ok) {
					resolve(parsed);
				}
				else {
					reject(parsed);
				}
			} catch (e) {
				reject({ error: "Impossible to read server response." })
			}

		}).catch(() => { reject({ error: "Impossible to communicate with the server." }) });
	});
}

async function parseResponse(response, type = 'boolnum', falseRes = false) {

	response = await response;

	switch (type) {

		case 'boolnum':
			if (typeof response === 'object')
				response = falseRes;
			break;

		case 'array':
			if (!response || !Array.isArray(response))
				response = falseRes;
			break;
	}

	return response;
}

/**
 * 
 * @param {*} filter 
 * @returns { id: 0, user_id: 0, status: '', price: 0, pickup_time: '', pickup_place: '', 'user':{id: 0, username: '', email: '', name: '', surname: ''}, 'products': [{order_id: 0,product_id: '', quantity: 0}]}
 */
async function getOrders(filter) {

	return parseResponse(await handleOrderAction(filter, [], {}, 'GET'), 'array', [])
}

/**
 * Frontend interface API
 * 
 * @param {*} filter 
 * @returns order in pending status
 */
async function getPendingOrders() {

	return getOrders('pending')
}

/**
 * Frontend interface API
 * 
 * @param {*} orderID 
 * @returns true|false
 */
async function handOutOrder(orderID = 0) {

	return parseResponse(await handleOrderAction(orderID, [], { id: orderID, status: 'handout' }, 'PUT'))
}
/**
 * Frontend interface API
 * 
 * @param {*} userID 
 * @param {*} products 
 * @param {*} order_details 
 * @returns true|false
 */
async function insertOrder(userID, products = [], order_details = {}) {

	return parseResponse(await handleOrderAction(userID, products, order_details, 'POST'))
}

/**
 * 
 * @param {*} email 
 * @returns 
 */
async function getUserId(email) {
	const response = await fetch('api/users/' + email);
	const respondeBody = await response.json();
	if (response.ok) {
		return respondeBody;
	}
	else throw respondeBody;
}

const AFApi = {
	insertOrder,
	handOutOrder,
	getPendingOrders,
	getOrders,
	getUserId
}

export default AFApi;