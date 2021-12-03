"use strict";
/* Data Access Object (DAO) module for accessing users */

const db = require("./../db");
const { validationResult } = require("express-validator");
// const { } = require("../utility")

exports.updateWallet = (ammount, client_email) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT users.id FROM users WHERE users.email = ?";
    db.get(sql, [client_email], (err, row) => {
      if (err) reject(err);
      else if (row === undefined) resolve({ error: "User not found." });
      else {
        const sql = "UPDATE users_meta SET meta_value = meta_value + ? WHERE users_meta.user_id = ? and users_meta.meta_key = 'wallet';";
        db.get(sql, [ammount, row.id], (err, row) => {
          if (err) {
            resolve(err);
          } else {
            resolve(true);
          }
        });
      }
    });
  });
};

exports.execApi = (app, passport, isLoggedIn) => {
  function thereIsError(req, res, action = '') {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return true;
    }

    return false
  }

  // POST /wallet/update/
  // parameters client_email, amount
  // up to the wallet the amount
  app.post(
    '/api/wallet/update/',
    isLoggedIn,
    async (req, res) => {
      if (thereIsError(req, res, 'insert'))
        return res
          .status(400)
          .render("contact", { errors: "error in the parameters" });
      try {
        this.updateWallet(req.body.amount, req.body.client_email)
          .then((res1) => {
            res.status(200).json({ result: res1 });
          })
          .catch((err) => {
            // console.log(err);
            res.status(503).json({ result: err });
          });
      } catch (err) {
        res.status(500).json(false);
      }
    }
  );
}
