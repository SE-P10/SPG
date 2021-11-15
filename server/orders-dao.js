const db = require('./db.js');

exports.getOrders = (client_email = null) => {
  return new Promise((resolve, reject) => {
    let sql = "select orders.id,user_id,status,price,pickup_time,pickup_place from orders, users where users.email = ? and orders.user_id = users.id"
    db.all(sql, [client_email], (err, rows) => {
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
