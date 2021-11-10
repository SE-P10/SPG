"use strict";
/* Data Access Object (DAO) module for accessing users */

const db = require("./db");

exports.updateWallet = (ammount, client_email) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE users_meta SET meta_value = meta_value + ? WHERE users_meta.user_id = (SELECT users.id FROM users WHERE users.email = ? LIMIT 1) and users_meta.meta_key = 'wallet';";
    db.get(sql, [ammount, client_email], (err, row) => {
      if (err) {
        console.log(err);
        reject(err);
      } else if (row === undefined) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};

