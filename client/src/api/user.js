/**
 *
 * @param {*} email
 * @returns
 */
async function getUserId(email) {
  const response = await fetch("api/users/" + email);
  const respondeBody = await response.json();
  if (response.ok) {
    return respondeBody;
  } else throw respondeBody;
}

//Delete user
async function deleteUser(email) {
  return new Promise((resolve, reject) => {
    fetch("/api/clients/" + email, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          resolve(null);
        } else {
          // analyze the cause of error
          response
            .json()
            .then((obj) => {
              reject(obj);
            }) // error msg in the response body
            .catch((err) => {
              reject({
                errors: [
                  { param: "Application", msg: "Cannot parse server response" },
                ],
              });
            }); // something else
        }
      })
      .catch((err) => {
        reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] });
      }); // connection errors
  });
}

// The parameter is an object like email: {"new.user@demo.it", password: "password", username: "username", name: "name", surname: "surname"}
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

const userAPI = {
  getUserId,
  deleteUser,
  addClient
};

export default userAPI;
