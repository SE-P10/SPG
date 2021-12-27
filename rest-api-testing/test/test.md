## farmer-dao.js 
GET /api/products/farmer/:farmer_id
POST /api/farmer/products/update
GET /api/orderProducts
GET /api/farmerOrders
POST /api/farmerOrders
GET /api/farmerOrders/open

## notification-dao.js
POST /api/notification/:user_id
PUT /api/notification/:id
GET /api/notification/:user_id

## orders-dao.js
PUT /api/orders/:order_id
POST /api/orders/:user_id
GET /api/orders/:filter?

## products-dao.js
GET /api/products
POST /api/basketProduct
DELETE /api/basketProduct
GET /api/basketProduct
GET /api/products/unretrived

## test-dao.js

## user-dao.js
GET /api/users/:id
POST /api/newClient

## wallet-dao.js
POST /api/wallet/update
GET /api/wallet/:mail

## warehouse-dao.js
GET /api/warehouse/openDeliveries
PUT /api/warehouse/openDeliveries/:delivery_id

## server.js
PUT /api/debug/time/:time
GET /api/debug/time
POST /api/sessions
DELETE /api/sessions/current
GET /api/sessions/current
DELETE /api/clients/:email
DELETE /api/test/restoretables
