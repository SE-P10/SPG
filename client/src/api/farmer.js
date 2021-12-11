// call: GET /api/farmer/pruducts
async function getFarmerProducts(farmerID) {

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


async function getFarmerOrders() {

  const response = await fetch("api/farmerOrders");
  const orders = await response.json();

  if (response.ok) {
    return orders;
  } else {
    throw orders; // an object with the error coming from the server
  }
}

async function confirmFarmerOrder(productID, quantity) {
  const response = await fetch("api/farmerOrders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      product: productID,
      quantity: quantity
    }),
  });
  return !!response.ok
}


async function getFarmerOpenDeliveries() {

  const response = await fetch("api/farmerOrders/open");
  const deliveries = await response.json();

  if (response.ok) {
    return deliveries;
  } else {
    throw deliveries; // an object with the error coming from the server
  }
}

const farmerAPI = {
  getFarmerProducts,
  updateFarmerProducts,
  getFarmerOrders,
  confirmFarmerOrder,
  getFarmerOpenDeliveries
};

export default farmerAPI;
