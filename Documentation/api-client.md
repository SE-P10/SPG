## API Client

## API.getFarmerProducts(farmerID)
  * Description: get all the products that a farmers decided to make avaible on
    the application.
  * Request params: farmerID, the id of the farmer 
  * Return: a list of all the products, it is empty in case the there are no
    products

## API.getOrders(filter = '')

* Description: get orders matching filter
* Request params: filter (**email** or **order status** or **orderID**)
* return: a list of orders as defined **[{ id: 0, user_id: 0, status: '', price: 0, pickup_time: '', pickup_place: '', 'user':{id: 0, username: '', email: '', name: '', surname: ''}, 'products': [{order_id: 0,product_id: '', quantity: 0}]}, ...]**

## API.updateOrder(orderID, products = [])

* Description: update products of an order
* Request params: userID, list of products as associative list **[{product_id: quantity}, ...]** or **[{product_id: 5, quantity: 5}, ...]** or **[{id: 5, quantity: 5}, ...]**
* Return: **true** or **false**

## API.handOutOrder(orderID)

* Description: set order to **handout** and perform payment
* Request params: orderID
* Return: **true** or **false**

## API.getPendingOrders()

* Description: return a list of pending orders
* Request params: none
* return: a list of orders as defined **[{ id: 0, user_id: 0, status: '', price: 0, pickup_time: '', pickup_place: '', 'user':{id: 0, username: '', email: '', name: '', surname: ''}, 'products': [{order_id: 0,product_id: '', quantity: 0}]}, ...]**

## API.insertOrder(userID, products, orderDetails)

* Description: insert a new order
* Request params: userID, list of products as associative list **[{product_id:quantity}, ...]** or **[{product_id: 5, quantity: 5}, ...]** or **[{id: 5, quantity: 5}, ...}]**, order details like **{pickup_time: '', pickup_place: '', status: 'booked'}**
* Return: **true** or **false**

## API.getNotification(userID)
* Description: get all notification from a user not yet seen
* Request params: userID
* Return: list of notification as defined **[{id:0, message: '', object: '', seen:0}, ...]**

## API.setSeenNotification(notificationID)
* Description: set a notification as seen
* Request params: notificationID
* Return: **true** or **false**

## API.addNotification(userID, message, object = '')
* Description: add a new user notification
* Request params: userID message, object of the notification
* Return: **true** or **false**

## API.getRequestedProducts(farmerID)

* Description: returns a list of ordered products for requested farmer
* Request params: farmerID
* Return: list of products as defined **[ {id: 2, quantity: 5, name: 'apple'}, ... ]**

## API.getProducts()

* Description: returns all the products in the database
* Request params: none
* Return: list of products **[ { id: 1, quantity: 10, price: 5, name: "product2 name", farmer: "farmer2 name" }, { id: 2, quantity: 4, price: 7, name: "product2 name", farmer: "farmer2 name" }, { ... }, ... ]**

## API.addClient(userID, products, orderDetails)

* Description: insert a new client
* Request params: object with client details **{ email: "new.user@demo.it", password: "password", username: "username", name: "name", surname: "surname", }**
* Return: null (if everything is fine) or an error message (if somthing is wrong)

## API.getWalletByMail(getWalletByMail)

* Description: returns the wallet value of the client associated with the given email
* Request params: string containing the clietns email **"user.selected@demo.it"**
* Return: the wallet value (if everything is fine) or an error message (if somthing is wrong)

## API.deleteAllBasket()

* Description: delete all the elements in the basket of the user that called the API
* Request params: none
* Return: null (if everything is fine) or an error message (if somthing is wrong)

## API.insertProductInBasket(product)

* Description: insert a new product in the basket of the user that called the API
* Request params: object with product details **{ product_id: 5, quantity: 10 }**
* Return: null (if everything is fine) or an error message (if somthing is wrong)

## API.getBasketProducts()

* Description: returns all the products in basket of the user that called the API
* Request params: none
* Return: list of products **[ { id: 1, quantity: 10, price: 5, name: "product2 name", farmer: "farmer2 name" }, { id: 2, quantity: 4, price: 7, name: "product2 name", farmer: "farmer2 name" }, { ... }, ... ]**

## API.setTime(newTime = {weekDay: "endDebug", hour: 0})

* Description: Modifies the week of the day and the hour in the server for the current session
* Request params: an object **{ weekDay: 'monday', hour: 5 }** when modifying the time, none when the debug operations end (deafult param is used)
* Return: null (if everything is fine) or an error message (if somthing is wrong)
