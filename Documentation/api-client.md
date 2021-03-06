## API Client

## API.setTime(time = 0)
* Description: Handle Virtual clock time in user session
* Request params: time, both datetime '2021-12-07' and unix timestamp (milliseconds or not)
* Return: true or false

## API.getTime(offset = false)
* Description: Handle Virtual clock time in user session
* Request params: offset to return only the offset from real one
* Return: virtual timestamp or an offset from real one

---

## API.insertOrder(userID, products, orderDetails)

* Description: insert a new order
* Request params: userID, list of products as associative list **[{product_id:quantity}, ...]** or **[{product_id: 5, quantity: 5}, ...]** or **[{id: 5, quantity: 5}, ...}]**, order details like **{pickup_time: '', pickup_place: '', status: 'booked'}**
* Return: **true** or **false**

## API.getOrder(orderID)

* Description: get order by id
* Request params: **orderID**
* return: as defined **{ id: 0, user_id: 0, status: '', price: 0, pickup_time: '', pickup_place: '', 'user':{id: 0, username: '', email: '', name: '', surname: ''}, 'products': [{order_id: 0,product_id: '', quantity: 0}]}**

## API.getOrders(filter = '', ofThisWeek = false)

* Description: get orders matching filter
* Request params: filter (**email** or **order status**), ofThisWeek = true will return orders only of this week
* return: a list of orders as defined **[{ id: 0, user_id: 0, status: '', price: 0, pickup_time: '', pickup_place: '', 'user':{id: 0, username: '', email: '', name: '', surname: ''}, 'products': [{order_id: 0,product_id: '', quantity: 0}]}, ...]**

## API.getPendingOrders(ofThisWeek = false)

* Description: return a list of pending orders
* Request params: ofThisWeek = true will return orders only of this week
* return: a list of orders as defined **[{ id: 0, user_id: 0, status: '', price: 0, pickup_time: '', pickup_place: '', 'user':{id: 0, username: '', email: '', name: '', surname: ''}, 'products': [{order_id: 0,product_id: '', quantity: 0}]}, ...]**

## API.updateOrder(orderID, products = [])

* Description: update products of an order
* Request params: userID, list of products as associative list **[{product_id: quantity}, ...]** or **[{product_id: 5, quantity: 5}, ...]** or **[{id: 5, quantity: 5}, ...]**
* Return: **true** or **false**

## API.handOutOrder(orderID)

* Description: set order to **handout** and perform payment
* Request params: orderID
* Return: **true** or **false**

## API.deliveryOrder(orderID, time, place = 'local')

* Description: set order pickup place and time
* Request params: orderID
* Return: **true** or **false**

---

## API.getProducts()

* Description: returns all the products in the database
* Request params: none
* Return: list of products **[ { id: 1, quantity: 10, price: 5, name: "product2 name", farmer: "farmer2 name" }, { id: 2, quantity: 4, price: 7, name: "product2 name", farmer: "farmer2 name" }, { ... }, ... ]**

## API.getRequestedProducts(farmerID)

* Description: returns a list of ordered products for requested farmer
* Request params: farmerID
* Return: list of products as defined **[ {id: 2, quantity: 5, name: 'apple'}, ... ]**

## API.getFarmerProducts(farmerID)

* Description: get all the products that a farmers decided to make avaible on
the application.
* Request params: farmerID, the id of the farmer 
* Return: a list of all the products, it is empty in case the there are no
products

## API.updateFarmerProducts(productID, newAmount, farmerId, price)

* Description: update the amount value and price of a product
* Request params; productID, farmerId, newAmount, price
* Return: the result of the update if is done or not

---

## API.addNotification(userID, message, object = '')
* Description: add a new user notification
* Request params: userID message, object of the notification
* Return: **true** or **false**

## API.getNotification(userID)
* Description: get all notification from a user
* Request params: userID
* Return: list of notification as defined **[{id:0, message: '', object: '', seen:0}, ...]**

## API.setSeenNotification(notificationID)
* Description: set a notification as seen
* Request params: notificationID
* Return: **true** or **false**

---

## API.getUserId(email)
* Description: return the id of the user with that email
* Request params: email
* Return: the id of the user.

## API.addClient(userID, products, orderDetails)

* Description: insert a new client
* Request params: object with client details **{ email: "new.user@demo.it", password: "password", username: "username", name: "name", surname: "surname", }**
* Return: null (if everything is fine) or an error message (if somthing is wrong)

---

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
