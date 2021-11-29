## API Client

#### API.getFarmerProducts(farmerID)
  * Description: get all the products that a farmers decided to make avaible on
    the application.
  * Request params: farmerID, the id of the farmer 
  * Return: a list of all the products, it is empty in case the there are no
    products

#### API.updateOrder(orderID, products = []) 
  * Description: update products and price of an order after checking new products availability
  * Note: to remove a product from an order set quantity to 0
  * Request params: userID, list of products as associative list **[{product_id:
    quantity}, ...]** or **[{product_id: 5, quantity: 5}, ...]** or **[{id: 5,
    quantity: 5}, ...]** where quantity is the new quantity
  * Return: true or false

#### API.handOut(orderID) 
  * Description: set order to **handout** and perform payment if balance on user wallet is enough otherwise an email notification is sent
  * Request params: **orderID**
  * Return: true or false

#### API.insertOrder(userID, products, orderDetails) 
  * Description: insert a new order, checks for products availability and calculate order price
  * Request params: userID, list of products as associative list
    **[{product_id:quantity}, ...]** or **[{product_id: 5, quantity: 5}, ...]**
    or **[{id: 5, quantity: 5}, ...}]**, order details like **{pickup_time: '',
    pickup_place: '', status: 'booked'}**
  * Return: true or false

