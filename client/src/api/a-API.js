'use strict';

async function updateOrder(userID, products = [], order_details = {}) {

	if (typeof order_details === 'number')
		order_details = { id: order_details };

	order_details = Object.assign({ id: 0 }, order_details)

	return new Promise((resolve, reject) => {
		fetch('/api/orders/' + userID + '/' + order_details.id, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ products: products, order: order_details })
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

async function insertOrder(userID, products = [], order_details = {}) {

	return new Promise((resolve, reject) => {
		fetch('/api/orders/' + userID, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ products: products, order: order_details })
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

async function getUserId(email) {
	const response = await fetch('api/users/' + email);
	const respondeBody = await response.json();
	if (response.ok) {
		return respondeBody;
	}
	else throw respondeBody;
}

const AFApi = {
	updateOrder,
	insertOrder,
	getUserId
}

export default AFApi;