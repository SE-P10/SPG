// call: GET /api/farmer/pruducts
async function getFarmerProducts(farmerID) {
  // const response = await fetch("/api/products/farmer/" + farmerID.id);
  const response = await fetch("/api/products/farmer/" + farmerID);
  const pFramer = await response.json();
  if (response.ok) {
    return pFramer;
  } else {
    throw pFramer; // an object with the error coming from the server
  }
}

async function updateFarmerProducts(productID, newAmount, farmerId, price) {
  const response = await fetch("/api/farmer/products/update/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      product_id: productID,
      amount: newAmount,
      farmer_id: farmerId,
      price: price,
    }),
  });
  return !!response.ok
}

const farmerAPI = {
  getFarmerProducts,
  updateFarmerProducts,
};
export default farmerAPI;
