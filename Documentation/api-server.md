
# API Server

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

## Get /api/orders/:client_email

The user need to be authenticated.
Return the list of orders made by a specific client given as parameter:

```url
http://localhost:3001/api/orders/john.doe@demo01.it
```

```json
{
  "id":1,
  "user_id":1,
  "status":"done",
  "price":10,
  "pickup_time":"5-11-21-10-00-10",
  "pickup_place":"TO"
}
```

## POST /api/orders/:user_id

The user need to be authenticated.
Return success if eveerything run correctly

```url
http://localhost:3001/api/orders/5
```

## PUT /api/orders/:user_id/:order_id

The user need to be authenticated.
Return success if eveerything run correctly

```url
http://localhost:3001/api/orders/5/80
```

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

## POST /api/newClient

```url
POST /api/newClient
Host: localhost
Content-Type: application/json

{
  "email": "new.client@demo.it",
  "password": "password",
  "username": "username",
  "name": "username,
  "surname": "surname"
}
```

Insert a new client in the databse

## GET /api/wallet/:email

The user need to be authenticated.
Return the value of the client whose mail is passed as parameter:

```url
http://localhost:3001/api/orders/john.doe@demo01.it
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
