'use strict';

const { validationResult } = require("express-validator");

const db = require("../db");
const { getUserMeta, updateUserMeta, getUser } = require("./user-dao");
const { isEmail, runQuerySQL, getQuerySQL, isArray, filter_args, removeEmpty, dynamicSQL, bulkSQL, existValueInDB, isNumber, debugLog } = require("../utility");

const getFarmersDeliveries = () => {
  return new Promise((resolve, reject) => {
    let query = "SELECT fp.id, pd.name AS product, pd.unit, fp.quantity, u.name AS farmerName, u.surname AS farmerSurname " 
    query += "FROM farmer_payments fp, products p, products_details pd, users u ";
    query += "WHERE fp.product_id = p.id AND pd.id = p.details_id AND fp.user_id = u.id AND status = 'toDeliver'"
    db.all(query, [], (err, rows) => {
      if (err) reject(err);
      else {
        const Deliveries = rows.map(d => ({
          id: d.id,
          product: d.product,
          unit: d.unit,
          quantity: d.quantity,
          farmerName: d.farmerName,
          farmerSurname: d.farmerSurname,
        }));
        resolve(Deliveries);
      }
    });
  });
}

const setFarmersDelivery = async deliveryID => {
  return runQuerySQL(db, "UPDATE farmer_payments SET status = 'delivered' WHERE id = ?", [deliveryID]);
}

exports.execApi = (app, passport, isLoggedIn) => {

  //GET /api/warehouse/openDeliveries
  app.get("/api/warehouse/openDeliveries", isLoggedIn, async (req, res) => {
    if(Number(req.user.role) !== 3) {
      res.status(401).json({error: "Only warehouse workers are allowed to perform this action"}).end();
    return;
  }
    try {
      const Deliveries = await getFarmersDeliveries();
      res.status(200).json(Deliveries);
    } catch (err) {
      res.status(500).end();
    }
  });

  // PUT /api/warehouse/openDeliveries/:delivery_id
  app.put('/api/warehouse/openDeliveries/:delivery_id', isLoggedIn, async (req, res) => {

    try {
      let status = await setFarmersDelivery(req.params.delivery_id);

      if (status)
        res.status(200).json(status).end();
      else
        res.status(400).json({ error: 'Unable to update deliveries' });

    } catch (err) {
      debugLog(err)
      res.status(503).json({ error: err });
    }
  });

}
