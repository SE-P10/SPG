"use strict";
const db = require("../db");

exports.restoreUsersTable = async () => {
    return new Promise((resolve, reject) => {
      const sql1 = "DELETE FROM users WHERE id > 5 ";
      db.all(sql1, [], (err) => {
        if (err) reject(err);
        else resolve(this.lastID);
      });
    });
  };

  exports.restoreProductsTable = async () => {

    return new Promise((resolve,reject) => {
      const sql = "UPDATE products SET quantity = 100";
      db.run(sql,[],function(err){
        if (err) {
          reject(err);return;
        }
        resolve()
      })
    })
  }