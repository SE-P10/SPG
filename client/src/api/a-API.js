'use strict';

async function handleOrderAction(filter, products = [], order_details = {}, method = 'POST') {

	if (typeof order_details === 'number')
		order_details = { id: order_details };
	else
		order_details = Object.assign({ id: 0 }, order_details)

	return new Promise((resolve, reject) => {
		fetch('/api/orders/' + filter, {
			method: method,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify((!!products || !!order_details) ? { products: products, order: order_details } : '')
		}).then((response) => {
			if (response.ok) {
				resolve(true);
			} else {
				response.json()
					.then((message) => { reject(message); }) // error message in the response body
					.catch(() => { reject({ error: "Impossible to read server response." }) }); // something else
			}
		}).catch(() => { reject({ error: "Impossible to communicate with the server." }) }); // connection errors
	});
}

/**
 * @return { id: 0, user_id: 0, status: '', price: 0, pickup_time: '', pickup_place: '', 'user':{id: 0, username: '', email: '', name: '', surname: ''}, 'products': [{order_id: 0,product_id: '', quantity: 0}]}
*/
async function getPendingOrders(filter) {
	return await handleOrderAction(filter, [], {}, 'GET')
}


async function handOutOrder(orderID = 0) {

	return await handleOrderAction(orderID, [], {
		id: orderID,
		status: 'handout'
	}, 'PUT')
}

async function insertOrder(userID, products = [], order_details = {}) {

	return await handleOrderAction(userID, products, order_details, 'POST')
}

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
	getUserId
}

export default AFApi;