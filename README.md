# SPG - Solidarity Purchasing Group

## TEAM P10

### MEMBERS

| NAME               | ID      |
| ------------------ | ------- |
| Alessandro Morelli | s280147 |
| Andrea Frolli      | s282095 |
| Amedeo Sarpa       | s281638 |
| Armando Chimirri   | s280119 |
| Desirè Damino      | s279575 |
| Michele Basilico   | s282513 |

## React Client Application Routes

- Route `/`: main page of the react application. It shows the homepage and it contains the links to the Login page, the Sign up page and to the About page.
- Route `/login`: it containes the Login form to access as user (client, shop employee or farmer). It's possibile to access to this route only if there's no user logged in, if there's already a logged user then there's a redirect, accordingly to the user's role, to Routes `/shopemployee`, `/clientpage ` or ` /farmerpage`.
- Route `/signup`: it containes the Sign up form for the user to register himself as a client.
- Route `/personalpage`: redirect to `/shopemployee`, `/clientpage ` or ` /farmerpage` accordingly to the logged user's role.
- Route `/shopemployee`: it renders the personal page of the shop employee, where all the actions he can perform are showed.
- Route `/farmerpage`: it renders the personal page of the farmer, where all the actions he can perform are showed.
- Route `/clientpage`: it renders the personal page of the client, where all the actions he can perform are showed.
- Route `/about`: it containes the page that shows the main informations about what SPG is and how it's born.

## Main React Components

- `AboutPage` (in `AboutPage.js`): it contains the main informations about what SPG is and how it was born, with related pictures.
- `ClientPage` (in `ClientPage.js`): it contains the list of the actions a client can perform. Each client can see all the products available and their details (price, farmer, category) and he can issue a new order.
- `ShopEmployee` (in `ShopEmployee.js`): it contains the list of the actions a shop employee can perform. Each shop employee can see register a new client, browse the products, check the orders, hand out an order, top up a wallet and issue a new order.
- `FarmerPage` (in `FarmerPage.js`): it contains the list of the actions a farmer can perform. Each farmer can update the quantity availability of each product he decides to sell.

## [Database structure](./Documentation/databe_structure.md)

## API

- [API Server](./Documentation/api-server.md)
- [API Client](./Documentation/api-client.md)

## Users Credentials

Email, Password, Role

- john.doe@demo01.it, password, [shop employee]
- mariorossi@demo.it, password, [client]
- paolobianchi@demo.it, password, [farmer]
