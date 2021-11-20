# API Client

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
