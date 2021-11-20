async function getProducts() {
    // call: GET /api/products
    const response = await fetch('/api/products');
    const productsJson = await response.json();
    if (response.ok) {
      	return productsJson.map(p => ({ id: p.id, quantity: p.quantity, price: p.price, name: p.name, farmer: p.farmer }));
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

//Delete user
async function deleteUser(email) {
    return new Promise((resolve, reject) => {
        fetch('/api/clients/' + email, {
            method: 'DELETE',
        }).then((response) => {
            if (response.ok) {
                resolve(null);
            } else {
                // analyze the cause of error
                response.json()
                    .then((obj) => { reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
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
	deleteUser,
	getWalletByMail,
	deleteAllBasket,
	insertProductInBasket,
	getBasketProducts
}

export default gAPI;