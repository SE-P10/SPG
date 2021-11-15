"use strict";
/* Data Access Object (DAO) module for accessing users */

const db = require("./db");

exports.updateWallet = (ammount, client_email) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    db.get(sql, [client_email], (err, row) => {
      if (err) reject(err);
      else if (row === undefined) resolve({ error: "User not found." });
      else {
        const sql = "UPDATE users_meta SET meta_value = meta_value + ? WHERE users_meta.user_id = (SELECT users.id FROM users WHERE users.email = ? LIMIT 1) and users_meta.meta_key = 'wallet';";
        db.get(sql, [ammount, client_email], (err, row) => {
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
