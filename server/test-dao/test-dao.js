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

  exports.restoreWalletsTable1 = async () => {

    return new Promise((resolve,reject) => {
      const sql = "UPDATE users_meta SET meta_value = 100";
      db.run(sql,[],function(err){
        if (err) {
          reject(err);return;
        }
        resolve()
      })
    })
  }

  exports.restoreWalletsTable2 = async () => {

    return new Promise((resolve,reject) => {
      const sql = "DELETE FROM users_meta WHERE user_id > 5 ";
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
      const sql = "DELETE FROM orders";
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
      const sql = "DELETE FROM orders";
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
      const sql = "DELETE FROM order_product";
      db.run(sql,[],function(err){
        if (err) {
          reject(err);return;
        }
        resolve()
      })
    })
  }