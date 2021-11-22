"use strict";
/* Data Access Object (DAO) module for accessing famer */

const db = require("../db");
const { runQuerySQL, getQuerySQL, isArray, filter_args, removeEmpty, dynamicSQL, bulkSQL, existValueInDB } = require("../utility");

exports.getProducts = async (farmerID) => {
  if (!farmerID)
    return null;

  let products = await getQuerySQL(db,
    "SELECT products.id, products_detalis.name, products.quantity FROM products_detalis, products WHERE products.id = products_detalis.id AND products.farmer_id = ?",
    [farmerID],
    {id: 0,  name: '', quantity: -1 }
  );


  return products;
}

// Update the value of a particular products avaiability
// exports.updateProducts = (farmerID, productID, newAmount) => {
//   const sql = "UPDATE farmer_products SET estimated_quantity = ? WHERE user_id = ? and product_id = ?";
//   db.get(sql, [newAmount, farmerID, productID], (err, row) => {
//     if (err) {
//       resolve({ 'error': err });
//     } else {
//       resolve(true);
//     }
//   });
// }
exports.updateProducts = async (farmerID, productID, newAmount) => {

  return new Promise((resolve,reject) => {
    const sql = "UPDATE products SET quantity = ? WHERE farmer_id = ? AND products.id = ?";
    db.run(sql,[newAmount,farmerID,productID],function(err){
      if (err) {
        reject(err);return;
      }
      resolve()
    })
  })
}
