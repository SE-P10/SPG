"use strict";
/* Data Access Object (DAO) module for accessing famer */

const db = require("../db");
const { validationResult } = require("express-validator");
const { is_possible } = require("../time");
const { runQuerySQL, getQuerySQL, dynamicSQL } = require("../utility");

const getFarmerOrders = async (farmer) => {
  let query =
    "SELECT p.id, SUM(op.quantity) as quantity, pd.name AS product, pd.unit FROM order_product op, products p, products_details pd, orders o ";
  query +=
    "WHERE op.product_id = p.id AND p.details_id = pd.id AND p.farmer_id = ? AND op.order_id = o.id AND o.status = 'booked' GROUP BY pd.name";
  return getQuerySQL(
    db,
    query,
    [farmer],
    {
      id: 0,
      quantity: 0,
      product: "",
      unit: "",
    },
    null,
    false
  );
};

const confirmFarmerProduct = async (farmer, product, quantity) => {
  let query =
    "DELETE FROM farmer_payments WHERE product_id = ? AND status = 'confirmed'";

  await runQuerySQL(db, query, [product]);

  query =
    "INSERT INTO farmer_payments (timestamp, user_id, product_id, quantity, price, status) VALUES(0, ?, ?, ?, 0, 'confirmed')";

  return runQuerySQL(db, query, [farmer, product, quantity]);
};

const getOpenDeliveries = async (farmer) => {
  let query =
    "SELECT fp.id, p.id AS product, fp.quantity FROM farmer_payments fp, products p ";
  query +=
    "WHERE fp.user_id = ? AND status = 'confirmed' AND fp.product_id = p.id";
  console.log(query);
  return getQuerySQL(
    db,
    query,
    [farmer],
    {
      id: 0,
      product: "",
      quantity: 0,
    },
    [],
    false
  );
};

exports.getProducts = async (farmerID) => {
  if (!farmerID) return null;

  let products = await getQuerySQL(
    db,
    "SELECT products.id, products_details.name, products.quantity, products.price FROM products_details, products WHERE products.id = products_details.id AND products.farmer_id = ?",
    [farmerID],
    { id: 0, name: "", quantity: 0 , price: 0}
  );

  return products;
};

exports.updateProducts = async (farmerID, productID, newAmount, price) => {
  let dinoSQL = dynamicSQL(
    "UPDATE products SET",
    { quantity: newAmount, price: price },
    { farmer_id: farmerID, id: productID }
  );

  return runQuerySQL(db, dinoSQL.sql, dinoSQL.values, true);
};

const listOrderProducts = (farmerId) => {
  return getQuerySQL(
    db,
    "SELECT pd.name AS name, SUM(op.quantity) AS quantity FROM order_product op, products p, product_details pd GROUP BY product_id WHERE p.details.id=pd-id AND op.product_id=p.product_id AND p.farmer_id=?",
    [farmerId],
    { name: "", quantity: 0 }
  );
};

exports.execApi = (app, passport, isLoggedIn) => {
  function thereIsError(req, res, action = "") {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return true;
    }

    return false;
  }

  // GET /api/products/farmer/:farmer_id
  // get all the products of a farmer
  app.get("/api/products/farmer/:farmer_id", isLoggedIn, (req, res) => {
    try {
      this.getProducts(req.params.farmer_id)
        .then((products) => {
          res.status(200).json(products);
        })
        .catch((err) => {
          res.status(503).json({});
        });
    } catch (err) {
      res.status(500).json(false);
    }
  });

  // POST /farmer/products/update/
  // parameters farmer_id, product_id, quantity, price
  // update the value of the product to the new value
  app.post("/api/farmer/products/update", isLoggedIn, async (req, res) => {
    if (!is_possible(req).farmer_estimation) {
      return res
        .status(400)
        .json({ error: "Unable to update products, wrong time" });
    }

    if (thereIsError(req, res, "update")) return res.status(422).end();
    try {
      await this.updateProducts(
        req.body.farmer_id,
        req.body.product_id,
        req.body.amount,
        req.body.price
      );
      res.status(200).end();
    } catch (err) {
      res.status(503).end();
    }
  });

  // GET /api/orderProducts
  app.get("/api/orderProducts", isLoggedIn, async (req, res) => {
    if (req.user.role !== 2)
      res
        .status(404)
        .json({ error: "Only farmers have access to this functionality" })
        .end();
    try {
      const Products = await listOrderProducts(req.user.id);
      res.json(Products);
    } catch (err) {
      res.status(500).end();
    }
  });

  // GET /api/farmerOrders
  app.get("/api/farmerOrders", isLoggedIn, async (req, res) => {
    try {
      const Products = await getFarmerOrders(req.user.id);
      res.json(Products);
    } catch (err) {
      res.status(500).end();
    }
  });

  // POST /api/farmerOrders
  app.post("/api/farmerOrders", isLoggedIn, async (req, res) => {
    try {
      await confirmFarmerProduct(
        req.user.id,
        req.body.product,
        req.body.quantity
      );
      res.status(200).end();
    } catch (err) {
      res.status(503).end();
    }
  });

  // GET /api/farmerOrders/open
  app.get("/api/farmerOrders/open", isLoggedIn, async (req, res) => {
    try {
      const deliveries = await getOpenDeliveries(req.user.id);
      res.json(deliveries);
    } catch (err) {
      res.status(500).end();
    }
  });
};
