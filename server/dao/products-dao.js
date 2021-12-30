const db = require("./../db");
const { check, validationResult } = require("express-validator");
const { runQuerySQL, getQuerySQL, dynamicSQL } = require("../utility");
const notificationDao = require("./notification-dao.js");

const listProducts = () => {
  return new Promise((resolve, reject) => {
    const sql =
      "select p.id AS idP, quantity, estimated_quantity, price, u.name AS fname, u.surname AS fsurname, u.id AS farmerID, pd.name as product from products p, users u, products_details pd where p.farmer_id = u.id and p.details_id = pd.id";
    db.all(sql, [], (err, rows) => {
      if (err) reject(err);
      else {
        const Products = rows.map((p) => ({
          id: p.idP,
          quantity: p.quantity,
          estimated_quantity: p.estimated_quantity,
          price: p.price,
          name: p.product,
          farmer: p.fname  + ' ' + p.fsurname,
          farmer_id: p.farmerID
        }));
        resolve(Products);
      }
    });
  });
};

const updateBasketElement = (product, userId) => {
  return new Promise((resolve, reject) => {
    const sql1 = "DELETE FROM basket WHERE user_id = ? AND product_id = ?";
    db.all(sql1, [userId, product.product_id], (err) => {
      if (err) reject(err);
      else if (product.quantity == 0) resolve(this.lastID);
      else {
        console.log(product.quantity);
        const sql =
          "INSERT INTO basket VALUES ((SELECT MAX(id)+1 FROM basket), ?, ?, ?)";
        db.all(sql, [userId, product.product_id, product.quantity], (err) => {
          if (err) {
            console.log(err);
            reject(err);
          } else resolve(this.lastID);
        });
      }
    });
  });
};

const listUnretrievedProducts = async () => {
  const query = 
    "SELECT (SELECT u1.email FROM users u1 WHERE u1.id = p.farmer_id) AS farmer, timestamp, op.quantity, p.id, u.email AS client, pd.name FROM orders o, order_product op, products p, products_details pd, users u WHERE status = 'deleted' AND o.id = order_id AND op.product_id = p.id AND p.details_id = pd.id AND o.user_id = u.id";
  const products = await getQuerySQL(db, query, [], { farmer: '', timestamp: 0, quantity: 0, id: 0, client:'', name: '' }, [], false);
  return products;
} 

const deleteAllBasket = (userId) => {
  return new Promise((resolve, reject) => {
    const sql1 = "DELETE FROM basket WHERE user_id = ?";
    db.all(sql1, [userId], (err) => {
      if (err) reject(err);
      else resolve(this.lastID);
    });
  });
};

const listProductsBasket = (userId) => {
  return new Promise((resolve, reject) => {
    const sql =
      "select p.id AS idP, b.quantity, price, u.name AS farmer, surname, pd.name as product from products p, users u, products_details pd, basket b where p.farmer_id = u.id and p.details_id = pd.id and p.id = b.product_id and b.user_id = ? ORDER BY b.id DESC";
    db.all(sql, [userId], (err, rows) => {
      if (err) reject(err);
      else {
        const Products = rows.map((p) => ({
          id: p.idP,
          quantity: p.quantity,
          price: p.price,
          name: p.product,
          Farmer: p.farmer + " " + p.surname,
        }));
        resolve(Products);
      }
    });
  });
};

exports.execApi = (app, passport, isLoggedIn, body) => {

  // GET /api/products
  app.get("/api/products", async (req, res) => {
    try {
      const Products = await listProducts();
      res.json(Products);
    } catch (err) {
      res.status(500).end();
    }
  });

  // POST /api/basketProduct
  app.post(
    "/api/basketProduct",
    [body("product_id").isNumeric(), body("quantity").isNumeric()],
    isLoggedIn,
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      try {
        await updateBasketElement(req.body, req.user.id);
        res.status(201).end();
      } catch (err) {
        res.status(503).json({ error: err });
      }
    }
  );

  // DELETE /api/basketProduct
  app.delete("/api/basketProduct", isLoggedIn, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      await deleteAllBasket(req.user.id);
      res.status(201).end();
    } catch (err) {
      res.status(503).json({ error: err });
    }
  });

  // GET /api/basketProduct
  app.get("/api/basketProduct", isLoggedIn, async (req, res) => {
    try {
      const Products = await listProductsBasket(req.user.id);
      res.json(Products);
    } catch (err) {
      res.status(500).end();
    }
  });

  // GET /api/products/unretrieved
  app.get("/api/products/unretrieved", isLoggedIn, async (req, res) => {
    try {console.log(req.user.role)
      if(req.user.role != 4)
        return res.status(401).end();
      const Products = await listUnretrievedProducts();
      res.json(Products);
      res.status(200).end();
    } catch (err) {
      res.status(500).end();
    }
  });

};

exports.notifyUnretireverUsers = async () => {
  const query = "SELECT u.id, COUNT(*) AS total FROM users u, orders o WHERE status = 'deleted' AND u.id = o.user_id GROUP BY u.id HAVING COUNT(*) >= 3";
  const unretrievedCount = await getQuerySQL(db, query, [], {id: 0, total: 0}, null, false);
  unretrievedCount.forEach(e => {
    const message = "Pay attention, you missed the pickup of" + (e.total === 3 ? " three " : " four ") + "orders!"
    notificationDao.addNotification(e.id, message, "Unretrieved orders", true);
  })
}
