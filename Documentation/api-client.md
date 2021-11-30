# API Client

## API.getOrders(filter = '')

* Description: get orders matching filter
* Request params: filter (**email** or **order status** or **orderID**)
* return: **{ id: 0, user_id: 0, status: '', price: 0, pickup_time: '', pickup_place: '', 'user':{id: 0, username: '', email: '', name: '', surname: ''}, 'products': [{order_id: 0,product_id: '', quantity: 0}]}**

## API.updateOrder(orderID, products = [])

* Description: update products of an order
* Request params: userID, list of products as associative list **[{product_id: quantity}, ...]** or **[{product_id: 5, quantity: 5}, ...]** or **[{id: 5, quantity: 5}, ...]**
* Return: true or false

## API.handOut(orderID)

* Description: set order to **handout** and perform payment
* Request params: **orderID**
* Return: true or false

## API.insertOrder(userID, products, orderDetails)

* Description: insert a new order
* Request params: userID, list of products as associative list **[{product_id:quantity}, ...]** or **[{product_id: 5, quantity: 5}, ...]** or **[{id: 5, quantity: 5}, ...}]**, order details like **{pickup_time: '', pickup_place: '', status: 'booked'}**
* Return: true or false

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

* Description: Modifies the week of the day and the hour in the server for the current session
* Request params: an object **{ weekDay: 'monday', hour: 5 }** when modifying the time, none when the debug operations end (deafult param is used)
* Return: null (if everything is fine) or an error message (if somthing is wrong)

## API.getFarmerProducts(farmerID)

* Description: get all the products that a farmers decided to make avaible on
  the application.
* Request params: farmerID, the id of the farmer
* Return: a list of all the products, it is empty in case the there are no
  products

## API.setTime(newTime = {weekDay: "endDebug", hour: 0})

* Description: set the time in the server at the day of the week and hour specified in the parameter. If no parameter is passed, the debug   session ends and the time on the server comes back to the real one
* Request params: it accepts no parameters or an object with two elements: a string representing the desired day of the week and an integer for the hour like **{weekDay: "monday", hour: 10}**
* Return: the code 201, if everithing went fine, an error, if somthing is wrong
