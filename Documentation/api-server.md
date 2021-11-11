## API Server

### POST /api/wallet/update/:client_email/:amount
Update the value of the wallet of a specific amount

### Get /api/orders/:client_email

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
