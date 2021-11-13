'use strict';

const { validationResult } = require("express-validator");

const db = require("./db");
const { isArray, filter_args, removeEmpty, dynamicSQL, bulkSQL, existValueInDB } = require("./utility");

const getOrder = async (orderID) => {

    if (!order_id)
        return {};

    return new Promise((resolve, reject) => {

        let sql = "SELECT * FROM orders where id = ?";

        db.get(sql, [order_id], (err, row) => {

            if (err) {
                reject(err);
                return;
            }

            const order = {
                id: row.id,
                user_id: row.user_id,
                status: row.status,
                price: row.price,
                pickup_time: row.pickup_time,
                pickup_place: row.pickup_place
            };

            resolve(order);
        });
    });
}

const handleOrder = async (orderRAW, status = '') => {

    if (typeof orderRAW === 'number') {

        if (!status) {
            return await existValueInDB(db, 'orders', 'id', orderRAW, 0);
        }

        orderRAW = { id: orderRAW };
    }

    let order = filter_args({
        id: 0,
        user_id: 0,
        status: status,
        price: 0,
        pickup_time: '',
        pickup_place: ''
    }, orderRAW || {});

    // prepare update data 
    let orderFiltered = removeEmpty(filter_args({
        status: false,
        price: false,
        pickup_time: false,
        pickup_place: false
    }, order), {}, true);

    // prevent empty insert/update 
    if (Object.keys(orderFiltered).length < 1) {
        return order.id || 0;
    }

    return new Promise(async (resolve, reject) => {

        if (order.id) {

            if (!await existValueInDB(db, 'orders', 'id', order.id))
                return reject('Is not a valid order, wrong orderID');

            let dinoSQL = dynamicSQL("UPDATE orders SET", orderFiltered, { id: order.id });

            db.run(dinoSQL.sql, [...dinoSQL.values], function (err) {
                if (err) {
                    console.log(err)
                    reject("Db error")
                }
                resolve(this.changes ? order.id : 0);
            });
        }
        else {

            if (!order.user_id || !await existValueInDB(db, 'users', 'id', order.user_id))
                return reject('Is not a valid order, wrong userID');

            let sql = 'INSERT INTO orders (user_id, status, price, pickup_time, pickup_place) VALUES(?, ?, ?, ?, ?)';

            db.run(sql, [order.user_id, order.status || 'booked', order.price, order.pickup_time, order.pickup_place], function (err) {
                if (err) {
                    console.log(err);
                    reject("Db error")
                }

                resolve(this.lastID);
            });
        }
    })
}

const handleOrderProducts = async (userID, orderID, data = {}) => {

    let products = data.products || [];

    let order = filter_args({
        id: orderID,
        user_id: userID,
        status: orderID ? '' : 'booked',
        price: 0,
        pickup_time: '',
        pickup_place: ''
    }, data.order || {});

    let updatingOrder = orderID || false;

    /**
     * Insert / Update a order {id:...}
    */
    orderID = await handleOrder(order);

    /**
     * Insert / Update a product list [{"id": "quantity"}, ...]
    */
    if (orderID && isArray(products) && products.length > 0) {

        let inserted = 0;

        if (updatingOrder) {

            products = await Promise.all(products.map(async (x) => {

                let pID = x.id || Object.keys(x)[0];
                let quantity = x.quantity || x[pID];

                let product = await existValueInDB(db, 'products', 'id', pID);

                if (!product)
                    return [];

                return [quantity, orderID, pID];
            }));

            products = removeEmpty(products, [], true);

            inserted = await bulkSQL(db, "UPDATE order_product SET quantity = ? WHERE order_id = ? AND product_id = ?", products);
        }
        else {

            products = await Promise.all(products.map(async (x) => {

                let pID = x.id || Object.keys(x)[0];
                let quantity = x.quantity || x[pID];

                let product = await existValueInDB(db, 'products', 'id', pID);

                if (!product)
                    return [];

                return [orderID, pID, quantity];
            }));

            products = removeEmpty(products, [], true);

            inserted = await bulkSQL(db, "INSERT INTO order_product (order_id, product_id, quantity) VALUES(?, ?, ?)", products);

            if (!inserted) {
                await handleOrder(orderID, 'error');
            }
        }

        return inserted;
    }

    return 0;
};

exports.execApi = (app, passport, isLoggedIn) => {

    // update existing order POST /api/orders/:user_id/:order_id
    app.put('/api/orders/:user_id/:order_id', isLoggedIn, async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        let user = await existValueInDB(db, 'users', 'id', req.params.user_id);

        if (!user) {
            res.status(501).json({ error: 'Invalid user ID' });
            return;
        }

        try {
            let status = await handleOrderProducts(req.params.user_id, req.params.order_id, req.body);

            if (status)
                res.status(201).end();
            else
                res.status(400).json({ error: 'Bad request' });

        } catch (err) {
            res.status(503).json({ error: err });
        }
    });

    // insert a new POST /api/orders/:user_id
    app.post('/api/orders/:user_id', isLoggedIn, async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        let user = await existValueInDB(db, 'users', 'id', req.params.user_id);

        if (!user) {
            res.status(501).json({ error: 'Invalid user ID' });
            return;
        }

        try {
            let status = await handleOrderProducts(req.params.user_id, 0, req.body);

            if (status)
                res.status(201).end();
            else
                res.status(400).json({ error: 'Bad request' });

        } catch (err) {
            console.log(err)
            res.status(503).json({ error: err });
        }
    });
}