'use strict';

// call: GET /api/farmer/pruducts
async function getFarmerProducts(farmerID) {


  const response = await fetch('/api/products/farmer/' + farmerID);
    const pFramer = await response.json();
    if (response.ok) {
      	return pFramer;
    } else {
      	throw pFramer;  // an object with the error coming from the server
    }
}

async function updateFarmerProducts(productID, newAmount,farmerId) {

  return new Promise((resolve, reject) => {
    fetch('/api/farmer/products/update/'+productID+'/'+newAmount+'/'+farmerId+'/',
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', },
      }).then((response) => {
        if (response.ok) {
          resolve(true);
        } else {
          throw response.json();
        }
      });
  });
}

const farmerAPI = {
  getFarmerProducts,
  updateFarmerProducts,
}
export default farmerAPI;
