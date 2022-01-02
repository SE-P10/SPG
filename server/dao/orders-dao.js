"use strict";

const AF_DEBUG = false;
const AF_ALLOW_DIRTY = AF_DEBUG;
const AF_DEBUG_PROCESS = AF_DEBUG;

const { validationResult } = require("express-validator");
const dayjs = require("dayjs");

const db = require("../db");
const notificationDao = require("./notification-dao");
const { getUserMeta, updateUserMeta, getUser } = require("./user-dao");
const {
  isEmail,
  runQuerySQL,
  getQuerySQL,
  isArray,
  filter_args,
  removeEmpty,
  dynamicSQL,
  bulkSQL,
  existValueInDB,
  isNumber,
  debugLog,
} = require("../utility");
const { addNotification } = require("./notification-dao");
const { is_possible, getVirtualTimestamp } = require("../time");

const getOrder = async (orderID) => {
  if (!orderID) return null;

  let order = await getQuerySQL(
    db,
    "SELECT * FROM orders WHERE id = ?",
    [orderID],
    {
      id: 0,
      user_id: 0,
      status: "",
      price: 0,
      pickup_time: "",
      pickup_place: "",
    },
    null,
    true
  );

  if (order) {
    order["products"] = await getQuerySQL(
      db,
      "SELECT * FROM order_product WHERE order_id = ?",
      [orderID],
      {
        order_id: 0,
        product_id: "",
        quantity: 0,
      }
    );

    order["user"] = await getQuerySQL(
      db,
      "SELECT * FROM users WHERE id = ?",
      [order.user_id],
      {
        id: 0,
        username: "",
        email: "",
        name: "",
        surname: "",
      }
    );
  }

  return order;
};

const getOrders = async (status = "", timestamp = 0) => {

  if (isNumber(status)) return getOrder(status);

  let sql = "SELECT * FROM orders WHERE timestamp >= ? ",
    values = [timestamp];

  if (status) {
    if (isEmail(status))
      sql += " AND user_id = (SELECT id FROM users WHERE email = ?);";
    else sql += " AND status = ?;";
    values.push(status);
  }

  let orders = await getQuerySQL(
    db,
    sql,
    values,
    {
      id: 0,
      user_id: 0,
      status: "",
      price: 0,
      pickup_time: "",
      pickup_place: "",
      timestamp: 0
    },
    null
  );

  if (orders && orders.length > 0) {
    orders = Promise.all(
      orders.map(async (order) => {
        return {
          ...order,
          user: await getQuerySQL(
            db,
            "SELECT * FROM users where id = ?",
            [order.user_id],
            {
              id: 0,
              username: "",
              email: "",
              name: "",
              surname: "",
            },
            null,
            true
          ),
          products: await getQuerySQL(
            db,
            "SELECT * FROM order_product where order_id = ?",
            [order.id],
            {
              order_id: 0,
              product_id: "",
              quantity: 0,
            }
          ),
        };
      })
    );
  }

  return orders;
};

const getOrderProduct = async (orderID, productID) => {
  if (!orderID || !productID) return null;

  return getQuerySQL(
    db,
    "SELECT * FROM order_product WHERE order_id = ? AND product_id = ?",
    [orderID, productID],
    {
      order_id: 0,
      product_id: 0,
      quantity: 0,
    },
    null,
    true
  );
};

const getProduct = async (productID) => {
  if (!productID) return null;

  return getQuerySQL(
    db,
    "SELECT * FROM products where id = ?",
    [productID],
    {
      id: 0,
      quantity: 0,
      price: 0,
      name: "",
    },
    null,
    true
  );
};

const getOrderProducts = async (orderID) => {
  if (!orderID) return null;
  const query =
    "SELECT op.product_id AS id, op.quantity, p.price FROM order_product op, products p WHERE op.product_id = p.id AND order_id = ?";
  return getQuerySQL(
    db,
    query,
    [orderID],
    {
      id: 0,
      price: 0,
      quantity: 0,
    },
    null,
    false
  );
};

const updateProduct = async (productID, data) => {
  if (!productID) return false;

  let dinoSQL = dynamicSQL("UPDATE products SET", data, { id: productID });

  return new Promise((resolve, reject) => {
    db.run(dinoSQL.sql, [...dinoSQL.values], function (err) {
      if (err) {
        debugLog(err);
        reject("Db error");
      }
      resolve(this.changes ? productID : 0);
    });
  });
};

const calcProductsPice = async (products = []) => {
  return await products.reduce(async (previousValue, item) => {
    let pID = item.product_id || item.id || Object.keys(item)[0];
    let quantity = item.quantity || item[pID];

    let product = await getProduct(pID);

    return (
      (await previousValue) +
      Number.parseFloat(quantity) * Number.parseFloat(product.price)
    );
  }, 0);
};

/**
 *
 * @param {object} order
 * @param {string} action
 * @param {Array} products
 * @returns boolean
 */
const handleOrderActions = async (order, action, products = []) => {
  let reStatus = order.id;

  switch (action) {
    case "handout":
      if (order.status !== "confirmed") return 0;

      let wallet = await getUserMeta(order.user_id, "wallet", true, 0);

      let productsPrice = await calcProductsPice(products);

      if (Number.parseFloat(wallet) >= Number.parseFloat(productsPrice)) {
        reStatus = await updateUserMeta(
          order.user_id,
          "wallet",
          Number.parseFloat(wallet) - Number.parseFloat(productsPrice)
        );
      } else {
        reStatus = 0;
        let user = await getUser(order.user_id);
        if (user) {
          await addNotification(
            order.user_id,
            "You orders is pending due to insufficient money. top-up your wallet!",
            "",
            user.email
          );
        }
      }

      if (!reStatus) {
        let dinoSQL = dynamicSQL(
          "UPDATE orders SET",
          { status: "pending" },
          { id: order.id }
        );

        await runQuerySQL(db, dinoSQL.sql, dinoSQL.values, true);
      }

      break;
  }

  return reStatus;
};

const orderExist = async (ordeID) => {
  return await existValueInDB(db, "orders", { id: ordeID }, 0);
};

const handleOrder = async (orderRAW, products = [], vTimeOffset = 0) => {

  if (isNumber(orderRAW)) {
    orderRAW = { id: orderRAW };
  }

  orderRAW = orderRAW || { id: 0 };

  if (orderRAW.id) {
    // get original order to prevent some malicious actions
    let order = await getOrder(orderRAW.id);

    if (!order) {
      if (AF_DEBUG) {
        debugLog("Is not a valid order, wrong orderID", orderRAW.id);
      }

      return 0;
    }

    let updateOrder = removeEmpty(
      filter_args(
        {
          status: false,
          price: false,
          pickup_time: false,
          pickup_place: false,
        },
        orderRAW
      ),
      {}
    );

    // prevent empty insert/update
    if (Object.keys(updateOrder).length < 1) {
      return orderRAW.id;
    }

    /**
     * process order actions, default return orderID
     */
    let reStatus = handleOrderActions(order, updateOrder.status, products);

    if (reStatus) {
      /***
       * if every action performed up to now are ok let's update the order
       */
      let dinoSQL = dynamicSQL("UPDATE orders SET", updateOrder, {
        id: orderRAW.id,
      });

      reStatus = (await runQuerySQL(db, dinoSQL.sql, dinoSQL.values, true))
        ? orderRAW.id
        : 0;
    }

    return reStatus ? orderRAW.id : 0;
  } else {
    let newOrder = filter_args(
      {
        user_id: 0,
        status: "booked",
        pickup_time: "",
        pickup_place: "",
      },
      orderRAW
    );

    let walletAmount = await getUserMeta(newOrder.user_id, "wallet", true, 0);

    if (
      Number.parseFloat(walletAmount) < Number.parseFloat(orderRAW.price || 0)
    ) {
      newOrder.status = "pending";
    }

    if (
      !newOrder.user_id ||
      (!AF_ALLOW_DIRTY &&
        !(await existValueInDB(db, "users", {
          id: newOrder.user_id,
          role: "0",
        })))
    ) {
      if (AF_DEBUG) {
        debugLog("Is not a valid order, wrong userID for:", newOrder);
      }

      return 0;
    }

    if (AF_DEBUG_PROCESS) {
      debugLog("Inserting order:", newOrder);
    }

    let sql = "INSERT INTO orders (user_id, status, price, pickup_time, pickup_place, timestamp) VALUES(?, ?, ?, ?, ?, ?)";

    return runQuerySQL(
      db,
      sql,
      [
        newOrder.user_id,
        newOrder.status,
        0,
        newOrder.pickup_time,
        newOrder.pickup_place,
        vTimeOffset + dayjs().unix()
      ],
      true
    );
  }
};

const handleOrderProducts = async (
  orderID,
  products,
  updatingOrder = false
) => {
  return new Promise(async (resolve) => {
    db.serialize(async () => {
      let processedProducts = [];

      let insertUpdateProducts = products.map((x) => {
        let pID = x.product_id || x.id || Object.keys(x)[0];
        let quantity = x.quantity || x[pID] || 0;

        return [pID, quantity];
      });

      db.run("BEGIN TRANSACTION;");

      if (updatingOrder) {
        try {

          //reset order price
          await handleOrder({ id: orderID, price: 0 });

          processedProducts = await bulkSQL(
            db,
            "REPLACE INTO order_product (order_id, product_id, quantity) VALUES(" +
            orderID +
            ", ?, ?)",
            insertUpdateProducts,
            {
              /**
               * check product availability
               */
              before: async (row) => {
                let pID = row[0],
                  quantity = Number.parseFloat(row[1] || 0),
                  product = await getProduct(pID),
                  orderedProduct = (await getOrderProduct(orderID, pID)) || {
                    order_id: orderID,
                    product_id: pID,
                    quantity: 0,
                  };

                if (!orderID || !product || quantity < 0) {
                  if (AF_DEBUG) {
                    debugLog("Invalid order/product:", orderID, product);
                  }
                  return false;
                }

                if (AF_DEBUG_PROCESS) {
                  debugLog("Updating product:", orderedProduct, row);
                }

                if (
                  Number.parseFloat(orderedProduct.quantity) +
                  Number.parseFloat(product.quantity) <
                  Number.parseFloat(quantity)
                ) {
                  if (AF_DEBUG) {
                    debugLog(
                      "Product quantity error:",
                      orderedProduct,
                      Number.parseFloat(orderedProduct.quantity) +
                      Number.parseFloat(quantity)
                    );
                  }

                  return false;
                }

                return orderedProduct;
              },
              /**
               * update product availability
               */
              after: async (row, insertedID, orderedProduct) => {
                if (!orderedProduct) return false;

                let pID = row[0],
                  order = await getOrder(orderID),
                  product = await getProduct(pID),
                  availableQuantity = Number.parseFloat(product.quantity) || 0,
                  orderedQuantity =
                    Number.parseFloat(orderedProduct.quantity) || 0,
                  updateQuantity = Number.parseFloat(row[1]) || 0;

                if (!product || !order) {
                  if (AF_DEBUG) {
                    debugLog("Error with product/order:", product, order);
                  }
                  return false;
                }

                let res = await updateProduct(pID, {
                  quantity:
                    orderedQuantity + availableQuantity - updateQuantity,
                });

                res *= await handleOrder({
                  id: orderID,
                  price:
                    Number.parseFloat(order.price) +
                    Number.parseFloat(product.price) *
                    Number.parseFloat(updateQuantity),
                });

                if (AF_DEBUG_PROCESS) {
                  debugLog("Updated product:", await getProduct(pID));
                  debugLog("Updated order:", await getOrder(orderID));
                }

                if (!res) {
                  if (AF_DEBUG) {
                    debugLog(
                      "Product update error:",
                      await getOrderProduct(orderID, pID)
                    );
                  }
                  return false;
                }

                return true;
              },
            },
            false
          );
        } catch (err) {
          if (AF_DEBUG) {
            debugLog("ERROR updating order ::", err);
          }
          processedProducts = [];
        }
      } else {
        try {
          processedProducts = await bulkSQL(
            db,
            "INSERT INTO order_product (order_id, product_id, quantity) VALUES(" +
            orderID +
            ", ?, ?)",
            insertUpdateProducts,
            {
              /**
               * check product availability
               */
              before: async (row) => {
                let pID = row[0],
                  quantity = Number.parseFloat(row[1] || 0),
                  product = await getProduct(pID);

                if (!orderID || !product || quantity < 0) {
                  if (AF_DEBUG) {
                    debugLog("Invalid order/product:", orderID, pID, product);
                  }
                  return false;
                }

                if (AF_DEBUG_PROCESS) {
                  debugLog("Inserting product order:", product, row);
                }

                if (
                  Number.parseFloat(product.quantity) <
                  Number.parseFloat(quantity)
                ) {
                  if (AF_DEBUG) {
                    debugLog("Inserting product error:", product, quantity);
                  }
                  return false;
                }

                return true;
              },
              /**
               * update product availability and order price
               */
              after: async (row, insertedID, statusCheck) => {
                let pID = row[0],
                  product = await getProduct(pID),
                  order = await getOrder(orderID);

                if (!order || !product) {
                  if (AF_DEBUG) {
                    debugLog("Invalid order/product:", order, product);
                  }
                  return false;
                }

                let res = await updateProduct(pID, {
                  quantity:
                    Number.parseFloat(product.quantity) -
                    Number.parseFloat(row[1]),
                });

                res *= await handleOrder({
                  id: orderID,
                  price:
                    Number.parseFloat(order.price) +
                    Number.parseFloat(product.price) *
                    Number.parseFloat(row[1]),
                });

                if (!res) {
                  if (AF_DEBUG) {
                    debugLog("Product quantity update error:", product);
                  }
                  return false;
                }

                if (AF_DEBUG_PROCESS) {
                  order = await getOrder(orderID);
                  debugLog("updated order:", order);
                }

                return true;
              },
            },
            false
          );
        } catch (err) {
          if (AF_DEBUG) {
            debugLog("ERROR insert order :: ", err);
          }
          processedProducts = [];
        }

        if (processedProducts.length !== insertUpdateProducts.length) {
          if (AF_DEBUG) {
            debugLog(
              "ERROR insert order :: not all products were processed correctly"
            );
          }
          processedProducts = [];
          await handleOrder({ id: orderID, status: "error" });
        }
      }

      db.run(processedProducts.length ? "COMMIT;" : "ROLLBACK;");

      resolve(processedProducts.length);
    });
  });
};

const processOrder = async (userID, orderID, data = {}, vTimeOffset = 0) => {

  let products = data.products || [];

  let order = {
    ...(data.order || {}),
    id: orderID,
    user_id: userID
  };

  let updatingOrder = orderID || false;

  /**
   * Insert / Update a order {id:...}
   */
  orderID = await handleOrder(order, products, vTimeOffset);

  if (AF_DEBUG_PROCESS) {
    debugLog("orderID: " + orderID);
  }

  /**
   * Insert / Update a product list [{"id": "quantity"}, ...]
   */
  if (orderID) {
    if (isArray(products) && products.length > 0) {
      let processed = await handleOrderProducts(
        orderID,
        products,
        updatingOrder
      );

      if (AF_DEBUG_PROCESS) {
        debugLog("Processed products:", processed);
      }

      return processed;
    }

    return orderID;
  }

  return 0;
};

const getConfirmedProducts = async () => {

  return getQuerySQL(
    db,
    "SELECT id, product_id AS product, quantity FROM farmer_payments where status = 'confirmed'",
    [],
    {
      id: 0,
      product: 0,
      quantity: 0,
    },
    null,
    false
  );
};

exports.deletePendingOrders = async () => {
  return db.run(
    "UPDATE orders SET status = 'deleted' WHERE status = 'pending'"
  );
};

exports.confrimOrders = () => {
  return new Promise(async (resolve, reject) => {
    db.run("BEGIN TRANSACTION;");
    try {
      //Get the quantities confirmed by the farmers and the related product's id
      const confirmedProducts = getConfirmedProducts();
      //Get all the booked orders
      const orders = await getOrders("booked");
      //Produce an array of objects like {id: row id, product: product id, leftQuantity: left quantity} to update farmer_payments later
      const res = orders.reduce(async (values, order) => {
        let newValues = (await values).map((v) => ({
          id: v.id,
          product: v.product,
          leftQuantity: v.quantity,
        }));
        //For each order, get its product
        const products = await getOrderProducts(order.id);
        //For each product, update the left quantity or remove the element from the order
        products.forEach((p) => {
          //if the product has not been confirmed by the farmer or the quantity is not enough,
          if (
            !newValues.some((v) => v.product === p.id) ||
            newValues.find((v) => v.product === p.id).leftQuantity < p.quantity
          ) {
            //it is removed from the order
            runQuerySQL(
              db,
              "DELETE FROM order_product WHERE order_id = ? AND product_id = ?;",
              [order.id, p.id]
            );
            //and the order price is decreased
            runQuerySQL(
              db,
              "UPDATE orders SET price = price - ? WHERE id = ?;",
              [p.price * p.quantity, order.id]
            );
            //send notification
            const message =
              "product code: " + p.id + "removed from order code " + order.id;
            notificationDao.addNotification(
              order.user_id,
              message,
              "product removed",
              true
            );
          } //Reduce the left quantity
          else
            newValues = newValues.map((v) =>
              v.product === p.id
                ? {
                  id: v.id,
                  product: v.product,
                  leftQuantity: v.leftQuantity - p.quantity,
                }
                : v
            );
        });
        let query =
          "SELECT meta_value FROM users_meta WHERE user_id = ? AND meta_key = 'wallet'";
        const wallet = (
          await getQuerySQL(
            db,
            query,
            [order.user_id],
            { meta_value: 0 },
            null,
            true
          )
        ).meta_value;
        const price = (
          await getQuerySQL(
            db,
            "SELECT price FROM orders WHERE id = ?",
            [order.id],
            { price: 0 },
            null,
            true
          )
        ).price;
        let newStatus = "";
        if (wallet < price) {
          newStatus = "pending";
          const message =
            "Your order code " + order.id + " is pending, top up your wallet!";
          notificationDao.addNotification(
            order.user_id,
            message,
            "pending order",
            true
          );
        } else if (price === 0) {
          newStatus = "missing_products";
          const message =
            "Your order code " +
            order.id +
            " has been deleted because no products are available!";
          notificationDao.addNotification(
            order.user_id,
            message,
            "Order deleted",
            true
          );
        } else {
          newStatus = "confirmed";
          //update wallet
          updateUserMeta(order.user_id, "wallet", wallet - price);
        }
        runQuerySQL(db, "UPDATE orders SET status = ? WHERE id = ?", [
          newStatus,
          order.id,
        ]);
        return newValues.map((v) => ({
          id: v.id,
          product: v.product,
          quantity: v.leftQuantity,
        }));
      }, confirmedProducts);
      //For each product confirmed by a farmer, the status is set to 'toDeliver' and the quantity decreased to that needed
      (await res).forEach(async (e) =>
        runQuerySQL(
          db,
          "UPDATE farmer_payments SET status = 'toDeliver', quantity = ? WHERE id = ?;",
          [
            (await confirmedProducts).find((cp) => cp.id === e.id).quantity -
            e.quantity,
            e.id,
          ]
        )
      );
      runQuerySQL(
        db,
        "DELETE FROM farmer_payments WHERE quantity = 0;",
        [],
        false
      );
      db.run("COMMIT;");
    } catch (err) {
      db.run("ROLLBACK;");
      return reject(err);
    }
  });
};

exports.execApi = (app, passport, isLoggedIn) => {

  function thereIsError(req, res, action = "") {
    if (AF_DEBUG) {
      console.log("\nProcessing " + action + " orders API ");
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return true;
    }

    return false;
  }

  // update existing order POST /api/orders/:user_id/:order_id
  app.put("/api/orders/:order_id", AF_ALLOW_DIRTY ? (req, res, next) => { return next(); } : isLoggedIn, async (req, res) => {
    
    if (!AF_ALLOW_DIRTY && (
    !(is_possible(req).clients_pickup_orders && req.body.order.status == 'handout') && !is_possible(req).clients_send_orders)) {
      return res.status(412).json({ error: "Operation not allowed in this moment!" });
    }

    if (thereIsError(req, res, "update")) {
      return;
    }

    try {
      let status = await processOrder(0, req.params.order_id, req.body);

      if (status) res.status(201).json(status).end();
      else res.status(400).json({ error: "Unable to update the order" });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
  );

  // insert a new POST /api/orders/:user_id
  app.post("/api/orders/:user_id", AF_ALLOW_DIRTY ? (req, res, next) => { return next(); } : isLoggedIn, async (req, res) => {

    if (thereIsError(req, res, "insert")) {
      return;
    }

    if (!AF_ALLOW_DIRTY && !is_possible(req).clients_send_orders) {
      return res.status(412).json({ error: "Operation not allowed in this moment!" });
    }

    let user = await existValueInDB(db, "users", { id: req.params.user_id });

    if (!user) {
      res.status(412).json({ error: "Invalid user ID" });
      return;
    }

    let vTimeOffset = getVirtualTimestamp(req, true);

    try {
      let status = await processOrder(req.params.user_id, 0, req.body, vTimeOffset);

      if (status) res.status(201).json(status).end();
      else res.status(400).json({ error: "Unable to insert a new order" });
    } catch (err) {
      debugLog(err);
      res.status(500).json({ error: err });
    }
  }
  );

  // GET order / orders /api/orders/:order_id
  app.get("/api/orders/:filter?/:all?", AF_ALLOW_DIRTY ? (req, res, next) => { return next(); } : isLoggedIn, async (req, res) => {

    if (thereIsError(req, res, "get")) {
      return;
    }

    let vTimestamp = 0;

    if (!req.params.all) {
      vTimestamp = getVirtualTimestamp(req, false, true).startOf('week').unix();
    }

    try {
      let status = await getOrders(req.params.filter, vTimestamp);

      if (status) res.status(200).json(status).end();
      else res.status(404).json({ error: "Unable to get orders" });
    } catch (err) {
      debugLog(err);
      res.status(500).json({ error: err });
    }
  }
  );
};
