async function getProducts() {
    // call: GET /api/products
    const response = await fetch('/api/products');
    const productsJson = await response.json();
    if (response.ok) {
      	return productsJson.map(p => ({ id: p.id, quantity: p.quantity, price: p.price, name: p.name, farmer: p.Farmer }));
    } else {
      	throw productsJson;  // an object with the error coming from the server
    }
}

async function addClient(newClient) {
    return new Promise((resolve, reject) => {
		fetch('/api/newClient', {
		  	method: 'POST',
		  	headers: {
				'Content-Type': 'application/json',
		  	},
			body: JSON.stringify(newClient)
		}).then((response) => {
			if (response.ok) {
				resolve(null);
			} else {
				response.json()
					.then((message) => { reject(message); }) // error message in the response body
					.catch(() => { reject({ error: "Impossible to read server response." }) }); // something else
			}
		}).catch(() => { reject({ error: "Impossible to communicate with the server." }) }); // connection errors
	});
}

async function getWalletByMail(mail) {
    // call: GET /api/products
    const response = await fetch('/api/wallet/' + mail);
    const walletJson = await response.json();
    if (response.ok) {
      	return walletJson.wallet;
    } else {
      	throw walletJson;  // an object with the error coming from the server
    }
}

async function insertProductInBasket(product) { //mettere controllo se prodotto già c'è o meno
	return new Promise((resolve, reject) => {
		fetch('/api/basketProduct', {
		  	method: 'POST',
		  	headers: {'Content-Type': 'application/json',},
			body: JSON.stringify(product)
		}).then((response) => {
			if (response.ok) {
				resolve(null);
			} else {
				response.json()
					.then((message) => { reject(message); }) // error message in the response body
					.catch(() => { reject({ error: "Impossible to read server response." }) }); // something else
			}
		}).catch(() => { reject({ error: "Impossible to communicate with the server." }) }); // connection errors
	});
}

async function deleteAllBasket() {
	return new Promise((resolve, reject) => {
		fetch('/api/basketProduct', {
		  method: 'DELETE',
		}).then((response) => {
		  if (response.ok) {
			resolve(null);
		  } else {
			response.json()
			  .then((message) => { reject(message); }) // error message in the response body
			  .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
			}
		}).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
	  });
}

async function getBasketProducts() {
    // call: GET /api/products
    const response = await fetch('/api/basketProduct');
    const productsJson = await response.json();
    if (response.ok) {
      	return productsJson.map(p => ({ id: p.id, quantity: p.quantity, price: p.price, name: p.name, farmer: p.farmer }));
    } else {
      	throw productsJson;  // an object with the error coming from the server
    }
}


const gAPI = {
    getProducts,
	addClient,
	getWalletByMail,
	deleteAllBasket,
	insertProductInBasket,
	getBasketProducts
}

export default gAPI;