## API Client

#### API.getFarmerProducts(farmerID)
  * Description: get all the products that a farmers decided to make avaible on
    the application.
  * Request params: farmerID, the id of the farmer 
  * Return: a list of all the products, it is empty in case the there are no
    products

#### API.updateOrder(orderID, products = []) 
  * Description: update products of an order
  * Request params: userID, list of products as associative list **[{product_id:
    quantity}, ...]** or **[{product_id: 5, quantity: 5}, ...]** or **[{id: 5,
    quantity: 5}, ...]**
  * Return: true or false

#### API.handOut(orderID) 
  * Description: set order to **handout** and perform payment
  * Request params: **orderID**
  * Return: true or false

#### API.insertOrder(userID, products, orderDetails) 
  * Description: insert a new order
  * Request params: userID, list of products as associative list
    **[{product_id:quantity}, ...]** or **[{product_id: 5, quantity: 5}, ...]**
    or **[{id: 5, quantity: 5}, ...}]**, order details like **{pickup_time: '',
    pickup_place: '', status: 'booked'}**
  * Return: true or false
