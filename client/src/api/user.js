'use strict';

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



const userAPI = {
	getUserId
}

export default userAPI;