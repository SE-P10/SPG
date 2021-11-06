# DATABASE TABLES

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

## users_meta
|NAME|TYPE|DESCRIPTION|
|---|---|---|
|id|INTEGER||
|user_id|INTEGER||
|meta_key|TEXT||
|meta_value|TEXT||

## basket
|NAME|TYPE|DESCRIPTION|
|---|---|---|
|id|INTEGER||
|user_id|INTEGER||
|product_id|INTEGER||

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

## order_products
|NAME|TYPE|DESCRIPTION|
|---|---|---|
|order_id|INTEGER||
|product_id|INTEGER||
|quantity|INTEGER||

## order_products
|NAME|TYPE|DESCRIPTION|
|---|---|---|
|id|INTEGER||
|user_id|INTEGER||
|status|TEXT||
|price|INTEGER||
|pickup_time|INTEGER||
|pickup_place|INTEGER||

## products
|NAME|TYPE|DESCRIPTION|
|---|---|---|
|id|INTEGER||
|quantity|INTEGER||
|price|INTEGER||
|name|TEXT||


