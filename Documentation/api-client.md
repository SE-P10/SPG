## API Client

#### API.updateOrder(user_id, products = [], orderDetails = {}) 
  * Description: update an order
  * Request params: userID, list of products as associative list ([{product_id:quantity}, {product_id:quantity}]), order details
  * Return: true or false

#### API.insertOrder(user_id, products, orderDetails) 
  * Description: insert a new order
  * Request params: userID, list of products as associative list ([{product_id:quantity}, {product_id:quantity}]), order details
  * Return: true or false
