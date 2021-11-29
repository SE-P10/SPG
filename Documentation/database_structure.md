# DATABASE TABLES

![Database](https://github.com/SE-P10/SPG/blob/master/Documentation/ERD.jpg?raw=true)

## Users

|NAME|TYPE|DESCRIPTION|
|---|---|---|
|id|INTEGER||
|email|TEXT||
|password|TEXT||
|username|TEXT||
|role|TEXT||
|name|TEXT||
|surname|TEXT||
|approved|INTEGER|default 0|

|VALUE|ROLE|
|---|---|
|0|Client|
|1|Shop employee|
|2|Farmer|

## users_meta

|NAME|TYPE|DESCRIPTION|
|---|---|---|
|id|INTEGER||
|user_id|INTEGER||
|meta_key|TEXT||
|meta_value|TEXT||

|META KEY|MEANING|
|---|---|
|wallet|Money in client's wallet|
|availability|Date in which a rider is available|

## basket

|NAME|TYPE|DESCRIPTION|
|---|---|---|
|id|INTEGER||
|user_id|INTEGER||
|product_id|INTEGER||
|quantity|INTEGER||

## farmer_payments

|NAME|TYPE|DESCRIPTION|
|---|---|---|
|id|INTEGER||
|timestamp|INTEGER||
|user_id|INTEGER||
|product_id|INTEGER||
|quantity|INTEGER||
|price|INTEGER||

## farmer_products

|NAME|TYPE|DESCRIPTION|
|---|---|---|
|user_id|INTEGER||
|product_id|INTEGER||
|estimated_quantity|INTEGER||

## order_product

|NAME|TYPE|DESCRIPTION|
|---|---|---|
|order_id|INTEGER||
|product_id|INTEGER||
|quantity|INTEGER||

## orders

|NAME|TYPE|DESCRIPTION|
|---|---|---|
|id|INTEGER||
|user_id|INTEGER||
|status|TEXT||
|price|INTEGER||
|pickup_time|INTEGER||
|pickup_place|INTEGER||

|POSSIBLE STATUS:|
|---|
|booked|
|handout|

## products

|NAME|TYPE|DESCRIPTION|
|---|---|---|
|id|INTEGER||
|farmer_id|INTEGER||
|details_id|INTEGER||
|quantity|INTEGER||
|name|TEXT||

## product_details

|NAME|TYPE|DESCRIPTION|
|---|---|---|
|id|INTEGER||
|name|TEXT||
