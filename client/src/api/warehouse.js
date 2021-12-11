async function getOpenDeliveries() {
    // call: GET /api/warehouse/openDeliveries
    const response = await fetch('/api/warehouse/openDeliveries');
    const deliveriesJson = await response.json();
    if (response.ok) {
      	return deliveriesJson.map(d => ({ 
            id: d.id,
            productName: d.product,
            unit: d.unit,
            quantity: d.quantity,
            farmer: d.farmerName + ' ' + d.farmerSurname,
            }));
    } else {
      	throw deliveriesJson;  // an object with the error coming from the server
    }
}

async function confirmDelivery(delivery_id) {
    // call:PUT /api/warehouse/openDeliveries/:delivery_id
	return new Promise((resolve, reject) => {
		fetch('/api/warehouse/openDeliveries/' + delivery_id, {
		  	method: 'PUT',
		  	headers: {'Content-Type': 'application/json',},
			body: JSON.stringify({})
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

const warehouseAPI = {
    getOpenDeliveries,
  confirmDelivery
};

export default warehouseAPI;