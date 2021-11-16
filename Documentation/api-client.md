## API Client

#### API.updateOrder(orderID, products = []) 
  * Description: update products of an order
  * Request params: userID, list of products as associative list **[{product_id: quantity}, ...]** or **[{product_id: 5, quantity: 5}, ...]** or **[{id: 5, quantity: 5}, ...]**
  * Return: true or false

#### API.handOut(orderID) 
  * Description: set order to **handout** and perform payment
  * Request params: **orderID**
  * Return: true or false

#### API.insertOrder(userID, products, orderDetails) 
  * Description: insert a new order
  * Request params: userID, list of products as associative list ([{product_id:quantity}, ...] or [{product_id: 5, quantity: 5}, ...] or {{id: 5, quantity: 5}, ...}), order details like {pickup_time: '', pickup_place: '', status: 'booked'}
  * Return: true or false
