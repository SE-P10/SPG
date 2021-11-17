'use strict';

const AF_DEBUG = true;
const AF_ALLOW_DIRTY = AF_DEBUG;
const AF_DEBUG_PROCESS = AF_DEBUG;

const { validationResult } = require("express-validator");

const db = require("./db");
const { getUserMeta, updateUserMeta } = require("./user-dao");
const { validateEmail, runQuerySQL, getQuerySQL, isArray, filter_args, removeEmpty, dynamicSQL, bulkSQL, existValueInDB } = require("./utility");

const getOrder = async (orderID) => {

    if (!orderID)
        return null;

    let order = await getQuerySQL(db, "SELECT * FROM orders where id = ?", [orderID], {
        id: 0,
        user_id: 0,
        status: '',
        price: 0,
        pickup_time: '',
        pickup_place: ''
    }, null, true);

    if (order) {
        order['products'] = await getQuerySQL(db, "SELECT * FROM order_product where order_id = ?", [orderID], {
            order_id: 0,
            product_id: '',
            quantity: 0
        })

        order['user'] = await getQuerySQL(db, "SELECT * FROM users where id = ?", [order.user_id], {
            id: 0,
            username: '',
            email: '',
            name: '',
            surname: ''
        })
    }

    return order;
}

const getOrders = async (status = '') => {

    if (typeof status === 'number' || /^\d+$/.test(status))
        return getOrder(status);

    let sql = 'SELECT * FROM orders',
        values = [];

    if (status) {
        if (validateEmail(status))
            sql += " WHERE user_id = (SELECT id FROM users WHERE email = ?);"
        else
            sql += " WHERE status = ?;"
        values.push(status)
    }

    let orders = await getQuerySQL(db, sql, values, {
        id: 0,
        user_id: 0,
        status: '',
        price: 0,
        pickup_time: '',
        pickup_place: ''
    }, null);

    if (orders && orders.length > 0) {
        orders = Promise.all(orders.map(async (order) => {

            console.log(await getQuerySQL(db, "SELECT * FROM users where id = ?", [order.user_id], {
                id: 0,
                username: '',
                email: '',
                name: '',
                surname: ''
            }, null, true))
            return {
                ...order,
                user: await getQuerySQL(db, "SELECT * FROM users where id = ?", [order.user_id], {
                    id: 0,
                    username: '',
                    email: '',
                    name: '',
                    surname: ''
                }, null, true),
                products: await getQuerySQL(db, "SELECT * FROM order_product where order_id = ?", [order.id], {
                    order_id: 0,
                    product_id: '',
                    quantity: 0
                })
            }
        }))
    }

    return orders;
}

const getOrderProduct = async (orderID, productID) => {

    if (!orderID || !productID)
        return null;

    return getQuerySQL(db, "SELECT * FROM order_product WHERE order_id = ? AND product_id = ?", [orderID, productID], {
        order_id: 0,
        product_id: 0,
        quantity: 0
    }, null, true)
}

const getProduct = async (productID) => {

    if (!productID)
        return null;

    return getQuerySQL(db, "SELECT * FROM products where id = ?", [productID], {
        id: 0,
        quantity: 0,
        price: 0,
        name: '',
    }, null, true)
}

const updateProduct = async (productID, data) => {

    if (!productID)
        return false;

    let dinoSQL = dynamicSQL("UPDATE products SET", data, { id: productID });

    return new Promise((resolve, reject) => {
        db.run(dinoSQL.sql, [...dinoSQL.values], function (err) {
            if (err) {
                console.log(err)
                reject("Db error")
            }
            resolve(this.changes ? productID : 0);
        });

    });
}

const handleOrder = async (orderRAW, status = '') => {

    if (typeof orderRAW === 'number') {

        if (!status) {
            /**
             * return orderID if exist otherwise 0, nothing to update here
            */
            return existValueInDB(db, 'orders', { id: orderRAW }, 0);
        }

        orderRAW = { id: orderRAW };
    }

    let newOrder = filter_args({
        id: 0,
        user_id: false,
        status: status,
        price: false,
        pickup_time: '',
        pickup_place: ''
    }, orderRAW || {});

    // trick to make 0 integer passed through removeEmpty
    if (newOrder.price !== false)
        newOrder.price += '';

    // prepare update data 
    let orderFiltered = removeEmpty(filter_args({
        status: false,
        price: false,
        pickup_time: false,
        pickup_place: false
    }, newOrder), {});

    // prevent empty insert/update 
    if (Object.keys(orderFiltered).length < 1) {
        return newOrder.id || 0;
    }

    return new Promise(async (resolve, reject) => {

        if (newOrder.id) {

            db.serialize(async () => {

                db.run("BEGIN TRANSACTION;");

                // get original order to prevent some malicious actions
                let order = await getOrder(newOrder.id);

                if (!order || !order.id)
                    return reject('Is not a valid order, wrong orderID');

                let dinoSQL = dynamicSQL("UPDATE orders SET", orderFiltered, { id: newOrder.id });

                let reStatus = (await runQuerySQL(db, dinoSQL.sql, dinoSQL.values, true)) ? newOrder.id : 0;

                if (reStatus) {

                    switch (newOrder.status) {
                        case 'handout':

                            let wallet = await getUserMeta(order.user_id, 'wallet', true, 0);

                            reStatus = 0;

                            if (Number.parseFloat(wallet) >= Number.parseFloat(order.price)) {
                                reStatus = await updateUserMeta(order.user_id, 'wallet', Number.parseFloat(wallet) - Number.parseFloat(order.price))
                            }

                            break;
                    }
                }

                if (reStatus) {
                    db.run("COMMIT;");
                    resolve(newOrder.id);
                }
                else {
                    db.run("ROLLBACK;");
                    resolve(0);
                }

            });
        }
        else {

            if (!newOrder.user_id || (!AF_ALLOW_DIRTY && !await existValueInDB(db, 'users', { id: newOrder.user_id, role: '0' })))
                return reject('Is not a valid order, wrong userID');

            let sql = 'INSERT INTO orders (user_id, status, price, pickup_time, pickup_place) VALUES(?, ?, ?, ?, ?)';

            resolve(await runQuerySQL(db, sql, [newOrder.user_id, newOrder.status || 'booked', newOrder.price, newOrder.pickup_time, newOrder.pickup_place], true));
        }
    })
}

const handleOrderProducts = async (orderID, products, updatingOrder = false) => {

    return new Promise(async (resolve) => {

        db.serialize(async () => {

            let processedProducts = [];

            db.run("BEGIN TRANSACTION;");

            if (updatingOrder) {

                let updateProducts = products.map((x) => {

                    let pID = x.product_id || x.id || Object.keys(x)[0];
                    let quantity = x.quantity || x[pID];

                    return [quantity, orderID, pID];
                });

                try {

                    processedProducts = await bulkSQL(db, "UPDATE order_product SET quantity = ? WHERE order_id = ? AND product_id = ?", updateProducts, {

                        /**
                         * check product availability
                        */
                        before: async (row) => {

                            let pID = row[2],
                                quantity = Number.parseFloat(row[0]),
                                product = await getProduct(pID),
                                orderedProduct = await getOrderProduct(orderID, pID) || { order_id: orderID, product_id: pID, quantity: 0 };


                            if (!orderID || !product || quantity < 0) {
                                if (AF_DEBUG) {
                                    console.log("Invalid order/product:", orderID, product)
                                }
                                return false;
                            }

                            if (AF_DEBUG_PROCESS) {
                                console.log("Updating product:", orderedProduct, row)
                            }

                            if ((Number.parseFloat(orderedProduct.quantity) + Number.parseFloat(product.quantity)) < Number.parseFloat(quantity)) {

                                if (AF_DEBUG) {
                                    console.log("Product quantity error:", orderedProduct, Number.parseFloat(orderedProduct.quantity) + Number.parseFloat(quantity))
                                }

                                return false;
                            }

                            return orderedProduct;
                        },
                        /**
                         * update product availability
                        */
                        after: async (row, insertedID, orderedProduct) => {

                            if (!orderedProduct)
                                return false;

                            let pID = row[2],
                                order = await getOrder(orderID),
                                product = await getProduct(pID),
                                availableQuantity = Number.parseFloat(product.quantity) || 0,
                                orderedQuantity = Number.parseFloat(orderedProduct.quantity) || 0,
                                updateQuantity = Number.parseFloat(row[0]) || 0;

                            if (!product || !order) {
                                if (AF_DEBUG) {
                                    console.log("Error with product/order:", product, order)
                                }
                                return false;
                            }

                            let res = await updateProduct(pID, { quantity: (orderedQuantity + availableQuantity - updateQuantity) });

                            res *= await handleOrder({ id: orderID, price: Number.parseFloat(order.price) + (Number.parseFloat(product.price) * (updateQuantity - orderedQuantity)) })

                            if (AF_DEBUG_PROCESS) {
                                console.log("Updated product:", await getProduct(pID))
                                console.log("Updated order:", await getOrder(orderID))
                            }

                            if (!res) {
                                if (AF_DEBUG) {
                                    console.log("Product update error:", await getOrderProduct(orderID, pID))
                                }
                                return false;
                            }

                            return true;
                        },
                    }, false);
                }
                catch (err) {
                    if (AF_DEBUG) {
                        console.log("ERROR updating order ::", err)
                    }
                    processedProducts = [];
                }

            }
            else {

                let insertProducts = products.map((x) => {

                    let pID = x.product_id || x.id || Object.keys(x)[0];
                    let quantity = x.quantity || x[pID];

                    return [orderID, pID, quantity];
                });

                try {
                    processedProducts = await bulkSQL(db, "INSERT INTO order_product (order_id, product_id, quantity) VALUES(?, ?, ?)", insertProducts, {
                        /**
                          * check product availability
                         */
                        before: async (row) => {

                            let pID = row[1],
                                quantity = Number.parseFloat(row[2]),
                                product = await getProduct(pID);

                            if (!orderID || !product || quantity < 0) {
                                if (AF_DEBUG) {
                                    console.log("Invalid order/product:", orderID, pID, product)
                                }
                                return false;
                            }

                            if (AF_DEBUG_PROCESS) {
                                console.log("Inserting product order:", product, row)
                            }

                            if (Number.parseFloat(product.quantity) < Number.parseFloat(quantity)) {
                                if (AF_DEBUG) {
                                    console.log("Inserting product error:", product, quantity)
                                }
                                return false;
                            }

                            return true;
                        },
                        /**
                         * update product availability and order price
                        */
                        after: async (row, insertedID) => {

                            let pID = row[1],
                                product = await getProduct(pID),
                                order = await getOrder(orderID);

                            if (!order || !product) {
                                if (AF_DEBUG) {
                                    console.log("Invalid order/product:", order, product)
                                }
                                return false;
                            }

                            let res = await updateProduct(pID, { quantity: (Number.parseFloat(product.quantity) - Number.parseFloat(row[2])) });

                            res *= await handleOrder({ id: orderID, price: Number.parseFloat(order.price) + (Number.parseFloat(product.price) * Number.parseFloat(row[2])) });

                            if (!res) {
                                if (AF_DEBUG) {
                                    console.log("Product quantity update error:", product)
                                }
                                return false;
                            }

                            if (AF_DEBUG_PROCESS) {
                                order = await getOrder(orderID);
                                console.log("updated order:", order)
                            }

                            return true;
                        },
                    }, false);
                }
                catch (err) {
                    if (AF_DEBUG) {
                        console.log("ERROR insert order :: ", err)
                    }
                    processedProducts = [];
                }

                if (processedProducts.length !== insertProducts.length) {
                    if (AF_DEBUG) {
                        console.log("ERROR insert order :: not all products were processed correctly")
                    }
                    processedProducts = [];
                    await handleOrder(orderID, 'error');
                }
            }

            db.run(processedProducts.length ? "COMMIT;" : "ROLLBACK;");

            resolve(processedProducts.length);
        });
    });
}

const processOrder = async (userID, orderID, data = {}) => {

    let products = data.products || [];

    let order = filter_args({
        id: orderID,
        user_id: userID,
        status: orderID ? '' : 'booked',
        //price: 0, removed to fix possible problems with frontend
        pickup_time: '',
        pickup_place: ''
    }, data.order || {});

    let updatingOrder = orderID || false;

    /**
     * Insert / Update a order {id:...}
    */
    orderID = await handleOrder(order);

    if (AF_DEBUG_PROCESS) {
        console.log("orderID: " + orderID)
    }

    /**
     * Insert / Update a product list [{"id": "quantity"}, ...]
    */
    if (orderID) {

        if (isArray(products) && products.length > 0) {

            let processed = await handleOrderProducts(orderID, products, updatingOrder);

            if (AF_DEBUG_PROCESS) {
                console.log("Processed products:", processed)
            }

            return processed;
        }

        return orderID;
    }

    return 0;
};

exports.execApi = (app, passport, isLoggedIn) => {

    // update existing order POST /api/orders/:user_id/:order_id
    app.put('/api/orders/:order_id', AF_ALLOW_DIRTY ? (req, res, next) => { return next() } : isLoggedIn, async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        try {
            let status = await processOrder(0, req.params.order_id, req.body);

            if (status)
                res.status(201).end();
            else
                res.status(400).json({ error: 'Unable to update the order' });

        } catch (err) {
            res.status(503).json({ error: err });
        }
    });

    // insert a new POST /api/orders/:user_id
    app.post('/api/orders/:user_id', AF_ALLOW_DIRTY ? (req, res, next) => { return next() } : isLoggedIn, async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        let user = await existValueInDB(db, 'users', { id: req.params.user_id });

        if (!user) {
            res.status(501).json({ error: 'Invalid user ID' });
            return;
        }

        try {
            let status = await processOrder(req.params.user_id, 0, req.body);

            if (status)
                res.status(201).end();
            else
                res.status(400).json({ error: 'Unable to insert a new order' });

        } catch (err) {
            console.log(err)
            res.status(503).json({ error: err });
        }
    });

    // GET order / orders /api/orders/:order_id
    app.get('/api/orders/:filter?', AF_ALLOW_DIRTY ? (req, res, next) => { return next() } : isLoggedIn, async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        try {
            let status = await getOrders(req.params.filter);

            if (status)
                res.status(200).json(status).end();
            else
                res.status(400).json({ error: 'Unable to get orders' });

        } catch (err) {
            console.log(err)
            res.status(503).json({ error: err });
        }
    });
}