
# API Server

## GET /api/users/:filter
* Description: Get user data 
* Request params: userID or user_email
* Return: user object as defined below
* HTTP Response: 200 success, 404 user not found, 500 Server Error
```json
{
  "id": 0,
  "name": "",
  "role": "client",
  "email": ""
}
```
## POST /api/newClient
* Description: add new client
* Body: user data as defined below
* Return: success or fail
* HTTP Response: 201 user created, 422 Unprocessable Request, 500 Server Error
```json
{
  "email": "",
  "password": "",
  "username": "",
  "name": "",
  "surname": ""
}
```
---

## PUT /api/debug/time/:time
* Description: set virtual time
* Request params: a time string like *(Wed Dec 08 2021 18:00:03 GMT+0100 (Ora standard dell’Europa centrale))* or an offset in seconds or a timestamp 
* Return: offset from real time in seconds
* HTTP Response: 201 time updated

## GET /api/debug/time/
* Description: get set session time
* Return: an object as defined below
* HTTP Response: 200 success
```json
{
  "offset": 0,
  "time": 1638982982,
}
```
---

## POST /api/notification/:user_id
* Description: save a new notification for user_id
* Request params: user_id
* Body: an object as defined below
* Return: success or fail
* HTTP Response: 201 notification updated, 400 Bad Request, 500 Server Error
```json
{
  "message": "",
  "object": "",
}
```

## PUT /api/notification/:id
* Description: set a notification as seen
* Request params: notification_id
* Return: success or fail
* HTTP Response: 201 notification updated, 400 Bad Request, 500 Server Error

## GET /api/notification/:user_id
* Description: get all notification for user_id
* Request params: user_id
* Return: an object as defined below
* HTTP Response: 200 success, 404 user not found, 500 Server Error
```json
{
  "id": 0,
  "message": "",
  "object": "",
  "seen": 0
}
```
---

## Get /api/orders/:filter?/:all?
* Description: get all orders based on the filter
* Request params: Filter (**orderID** *(will return only an object)* or **user_email** or **order status** *(like: pending)*), if **all** is passed will return all orders otherwise only of the current week
* Return: an array of objects or a single one as defined below
* HTTP Response: 200 success, 404 order not found, 422 Unprocessable Request, 500 Server Error
```json
{
  "id": 0,
  "user_id": 0,
  "status": "",
  "price": 0,
  "pickup_time": "",
  "pickup_place": "",
  "timestamp": 0,
  "user": {
            "username": "",
            "email": "",
            "role": "client",
            "name": "",
            "surname": "",
          },
  "products": [{
            "product_id": 0,
            "quantity": 0
            }, ],
}
```

## POST /api/orders/:user_id
* Description: insert a new order for user_id
* Request params: **user_id** 
* Body: an object as defined below
* Return: success or fail
* HTTP Response: 201 success, 400 Bad Request, 412 Precondition Failed, 422 Unprocessable Request, 500 Server Error
```json
{
  "order": {
            "status": "",
            "pickup_time": "",
            "pickup_place": "",
          },
  "products": [{
            "product_id": 0,
            "quantity": 0
            }, ],
}
```

## PUT/api/orders/:order_id
* Description: update an order
* Request params: **order_id** 
* Body: an object as defined below
* Return: success or fail
* HTTP Response: 201 success, 400 Bad Request, 412 Precondition Failed, 422 Unprocessable Request, 500 Server Error
```json
{
  "order": {
            "status": "",
            "pickup_time": "",
            "pickup_place": "",
          },
  "products": [{
            "product_id": 0,
            "quantity": 0
            }, ],
}
```

---


## GET /api/products/farmer/:farmer_id

Get the list of all the products of a farmer

```url
http://localhost:3001/api/products/farmer/4
```

## POST /api/farmer/products/update
update the products amount, of a farmer 

```url 
POST /api/farmer/products/update HTTP/1.1
Host: localhost
Content-Type: application/json
Content-Length: 52

{
  "farmer_id": 4,
  "product_id": 2,
  "quantity":200,
  "price":20,
}
```

## POST /api/wallet/update/

```url
POST /api/wallet/update HTTP/1.1
Host: localhost
Content-Type: application/json
Content-Length: 52

{
  "client_email": "john.doe@demo01.it",
  "amount": 10
}
```

Update the value of the wallet of a specific amount

## GET /api/products

The user need to be authenticated.
Return a list of the products in the database

```url
http://localhost:3001/api/products
```

```json
{
  "id": 1,
  "quantity": 10,
  "price": 5,
  "name": "product name",
  "Farmer": "farmerName farmerSurname"
}
```

Insert a new client in the databse

## GET /api/wallet/:email

The user need to be authenticated.
Return the amount of money that are present in the wallet client whose mail is 
passed as parameter:

```url
http://localhost:3001/api/wallet/john.doe@demo01.it
```

```json
{
  "wallet": 50
}
```

## POST /api/basketProduct

```url
POST /api/basketProduct
Host: localhost
Content-Type: application/json

{
  "product_id": 1,
  "quantity": 4
}
```

Delete the element associated with the id in the received object from the basket of the client that called the API. Then, if quantity is not 0, insert the received object in the database

## DELETE /api/basketProduct

The user need to be authenticated.

```url
http://localhost:3001/api/basketProduct
```

Delete all the element in basket associated with the user that called the API

## GET /api/basketProduct

The user need to be authenticated.
Return the list of the products in basket associated with the user that called the API

```url
http://localhost:3001/api/basketProduct
```

```json
{
  "id": 1,
  "quantity": 10,
  "price": 5,
  "name": "product name",
  "Farmer": "farmerName farmerSurname"
}
```
