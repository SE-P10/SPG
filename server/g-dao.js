const db = require("./db");

const listProducts = () => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM products";
      db.all(sql, [], (err, rows) => {
        if (err) reject(err);
        else {
          const Products = rows.map(p => ({ id: p.id, quantity: p.quantity, price: p.price, name: p.name }));
          resolve(Products);
        }
      });
    });
  };

exports.execApi = (app, passport) => {

    app.get('/api/products', async (req, res) => {
        try {
        const Products = await listProducts();
        res.json(Products);
        } catch(err) {
        res.status(500).end();
        }
    });

}