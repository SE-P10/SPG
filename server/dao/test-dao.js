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

  exports.restoreOptionsTable = async () => {

    return new Promise((resolve,reject) => {
      const string = '{"bfde77f1aa9c6f991c832003131db96a":{"name":"confrimOrders","interval":{"from":{"day":"Mo","hour":9},"to":{"day":"We","hour":9}},"callback":null,"time":1643802078},"40add83788a3eaf3b8ffb8ebb58f4851":{"name":"deletePendingOrders","interval":{"from":{"day":"Mo","hour":23},"to":{"day":"Sa","hour":9}},"callback":null,"time":1643802114},"0f7c3691065eb6ded201cf77fb5ceed0":{"name":"unretrivedOrders","interval":"Fr","callback":null,"time":1643369910},"ef46220c8f30bba962155418103af18a":{"name":"telegramBOT","interval":"Sa","callback":null,"time":1643459986}}'
      //const string = 'Ciao'
      const sql = 'UPDATE options SET value = ? WHERE id = 1';
      db.run(sql,[string],function(err){
        if (err) {
          reject(err);return;
        }
        console.log('Ueueee')
        resolve()
      })
    })
  }
  
  exports.restoreNotificationsTable = async () => {

    return new Promise((resolve,reject) => {
      const sql = "DELETE FROM notifications";
      db.run(sql,[],function(err){
        if (err) {
          reject(err);return;
        }
        resolve()
      })
    })
  }
