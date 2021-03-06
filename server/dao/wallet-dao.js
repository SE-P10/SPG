"use strict";
/* Data Access Object (DAO) module for accessing users */

const db = require("./../db");
const { validationResult } = require("express-validator");
const { getQuerySQL, runQuerySQL } = require("../utility")
const { getUserMeta } = require("./user-dao")

exports.updateWallet = async (ammount, client_email) => {
  return new Promise(async (resolve, reject) => {
    const sql = "SELECT users.id FROM users WHERE users.email = ?";
    let user_id = (await getQuerySQL(db, sql, [client_email], { id: 0 }, { id: -1 }, true)).id
    if ((user_id === -1)) {
      resolve({ error: "User not found." });
    } else {
      const sql = "UPDATE users_meta SET meta_value = meta_value + ? WHERE users_meta.user_id = ? and users_meta.meta_key = 'wallet';";
      try {
        runQuerySQL(db, 'BEGIN TRANSACTION', [], true);
        runQuerySQL(db, sql, [ammount, user_id], true);
        const pendingOrders = await getQuerySQL(db, "SELECT id, price FROM orders WHERE status = 'pending' AND user_id = ?", [user_id], {id: 0, price: 0 }, null,  false);
        let newWallet = (await getQuerySQL(db, "SELECT meta_value FROM users_meta WHERE meta_key = 'wallet' AND user_id = ?", [user_id], {meta_value: 0}, null, true)).meta_value;
        pendingOrders.forEach(o => {
          if(o.price <= newWallet){
            runQuerySQL(db, "UPDATE orders SET status = 'confirmed' WHERE id = ?", [o.id], true);
            newWallet -= o.price;
          }
        });
        runQuerySQL(db, "UPDATE users_meta SET meta_value = ? WHERE user_id = ? AND meta_key = 'wallet'", [newWallet, user_id], true);
        runQuerySQL(db, 'COMMIT', [], true);
      }
      catch(e) {
        runQuerySQL(db, 'ROLLBACK', [], true);
        return reject(e);
      }
    }
  });
};

const getWalletByMail = (userId, mail) => {
  return new Promise((resolve, reject) => {
    const sql1 = "SELECT * FROM users WHERE id = ? AND role = 1";
    db.all(sql1, [userId], (err, rows) => {
      if (err) reject(err);
      else if (!rows) reject("User not authorized");
    });
    const sql =
      "SELECT email, meta_value AS wallet FROM users_meta UM, users U WHERE meta_key = 'wallet' AND user_id = U.id AND email = ?";
    db.all(sql, [mail], (err, rows) => {
      if (err) reject(err);
      else if (!rows.length) reject("User not found!");
      else resolve({ wallet: rows[0].wallet });
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

  // GET /wallet/:mail
  app.get("/api/wallet/:mail", isLoggedIn, async (req, res) => {
    try {
      const wallet = await getWalletByMail(req.user.id, req.params.mail);
      res.json(wallet);
    } catch (err) {
      res.status(500).end();
    }
  });
}
