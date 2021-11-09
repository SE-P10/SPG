const db = require('./db.js');

exports.getOrders = (userID = null) => {
  return new Promise((resolve, reject) => {
    let sql = "";
    if (userID = null) {
      sql = "select * from orders";
    } else {
      sql = "select * from orders where user_id = ?"
    }
    db.all(sql, [userID], (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }

      const orders = rows.map((order) => ({
        id: order.id,
        user_id: order.user_id,
        status: order.status,
        price: order.price,
        pickup_time: order.pickup_time,
        pickup_place: order.pickup_place
      }));

      resolve(orders);
    });
  });

}
