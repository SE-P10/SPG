"use strict";
/* Data Access Object (DAO) module for accessing famer */

const db = require("../db");
const { validationResult } = require("express-validator");
const { runQuerySQL, getQuerySQL, dynamicSQL, } = require("../utility");

exports.getProducts = async (farmerID) => {
  if (!farmerID)
    return null;

  let products = await getQuerySQL(db,
    "SELECT products.id, products_details.name, products.quantity FROM products_details, products WHERE products.id = products_details.id AND products.farmer_id = ?",
    [farmerID],
    { id: 0, name: '', quantity: -1 }
  );

  return products;
}

exports.updateProducts = async (farmerID, productID, newAmount, price) => {

  let dinoSQL = dynamicSQL("UPDATE products SET", { quantity: newAmount, price: price }, { farmer_id: farmerID, id: productID });

  return runQuerySQL(db, dinoSQL.sql, dinoSQL.values, true);
}

exports.execApi = (app, passport, isLoggedIn) => {
  function thereIsError(req, res, action = '') {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return true;
    }

    return false
  }

  // GET /api/products/farmer/:farmer_id
  // get all the products of a farmer
  app.get(
    '/api/products/farmer/:farmer_id',
    isLoggedIn,
    (req, res) => {
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
  app.post(
    '/api/farmer/products/update',
    async (req, res) => {
      if (thereIsError(req, res, 'update'))
        return res.status(422).end();
      try {
        await this.updateProducts(
          req.body.farmer_id,
          req.body.product_id,
          req.body.quantity,
          req.body.price,
        );
        res.status(200).end();
      } catch (err) {
        res.status(503).end();
      }
    }

  )
}
