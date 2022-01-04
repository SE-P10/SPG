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

  exports.restoreUsersMetaTable = async () => {
    return new Promise((resolve, reject) => {
      const sql1 = "DELETE FROM users_meta WHERE user_id > 5 AND meta_key = 'wallet'";
      db.all(sql1, [], (err) => {
        if (err) reject(err);
        else resolve(this.lastID);
      });
    });
  };

  exports.restoreProductsTable = async () => {

    return new Promise((resolve,reject) => {
      const sql = "UPDATE products SET quantity = 100, estimated_quantity = 100";
      db.run(sql,[],function(err){
        if (err) {
          reject(err);return;
        }
        resolve()
      })
    })
  }

  exports.restoreOrdersTable = async () => {

    return new Promise((resolve,reject) => {
      const sql = "DELETE FROM orders WHERE user_id > 5";
      db.run(sql,[],function(err){
        if (err) {
          reject(err);return;
        }
        resolve()
      })
    })
  }


  exports.restoreOrderProductTable = async () => {

    return new Promise((resolve,reject) => {
      const sql = "DELETE FROM order_product WHERE order_id in ( SELECT op.order_id FROM order_product AS op LEFT JOIN orders AS o ON op.order_id = o.id WHERE o.user_id > 5 )";
      db.run(sql,[],function(err){
        if (err) {
          reject(err);return;
        }
        resolve()
      })
    })
  }

  exports.restoreFarmerPayments = async () => {

    return new Promise((resolve,reject) => {
      const sql = "DELETE FROM farmer_payments";
      db.run(sql,[],function(err){
        if (err) {
          reject(err);return;
        }
        resolve()
      })
    })
  }


  exports.restoreBasketTable = async () => {

    return new Promise((resolve,reject) => {
      const sql = "DELETE FROM basket";
      db.run(sql,[],function(err){
        if (err) {
          reject(err);return;
        }
        resolve()
      })
    })
  }
  
