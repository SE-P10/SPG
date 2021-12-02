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

const userAPI = {
  getUserId,
  deleteUser,
};

export default userAPI;
