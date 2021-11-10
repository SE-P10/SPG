async function getProducts() {
    // call: GET /api/products
    const response = await fetch('/api/products');
    const productsJson = await response.json();
    if (response.ok) {
      return productsJson.map(p => ({ id: p.id, quantity: p.quantity, price: p.price, name: p.name }));
    } else {
      throw productsJson;  // an object with the error coming from the server
    }
  }

const gAPI = {
    getProducts
}

export default gAPI;