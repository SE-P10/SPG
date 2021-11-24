'use strict'

async function restoreTables() {
	return new Promise((resolve, reject) => {
		fetch('/api/test/restoretables/', {
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

const testAPI = {
    restoreTables
  }
  export default testAPI;