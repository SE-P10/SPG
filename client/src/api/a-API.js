'use strict';



//async function getPendingOrders() : 
// Valore ritorno lista di ordini con i seguenti campi : id , prezzo , mail user che ha fatto ordine che si trova facendo join tra tabella user e orders



async function handleOrderAction(idOU, products = [], order_details = {}, method = 'POST') {

	if (typeof order_details === 'number')
		order_details = { id: order_details };
	else
		order_details = Object.assign({ id: 0 }, order_details)

	return new Promise((resolve, reject) => {
		fetch('/api/orders/' + idOU, {
			method: method,
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

async function handOutOrder(orderID = 0) {

	return handleOrderAction(orderID, [], {
		id: orderID,
		status: 'handout'
	}, 'PUT')
}

async function insertOrder(userID, products = [], order_details = {}) {

	return handleOrderAction(userID, products, order_details, 'POST')
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
	getUserId
}

export default AFApi;