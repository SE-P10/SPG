const db = require("./../db");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const { isEmail } = require("../utility");

const addClient = async (newClient) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users WHERE email = ?";
    db.all(query, [newClient.email], (err, rows) => {
      if (err) reject(err);
      else if (rows.length) reject("Email already in use!");
      else {
        const sql1 =
          "INSERT into users VALUES((SELECT MAX(id)+1 FROM users), ?, ?, ?, 0, ?, ?, 0)";
        const sql2 =
          "INSERT into users_meta VALUES((SELECT MAX(id)+1 FROM users_meta), (SELECT MAX(id) FROM users), 'wallet', 0)";
        bcrypt.hash(newClient.password, 10).then((passwordHash) => {
          db.run(
            sql1,
            [
              newClient.email,
              passwordHash,
              newClient.username,
              newClient.name,
              newClient.surname,
            ],
            (err) => {
              if (err) reject(err);
              db.run(sql2, [], (err) => {
                if (err) reject(err);
                resolve(this.lastID);
              });
            }
          );
        });
      }
    });
  });
};

const listProducts = () => {
  return new Promise((resolve, reject) => {
    const sql =
      "select p.id AS idP, quantity, price, u.name AS farmer, surname, pd.name as product from products p, users u, products_detalis pd where p.farmer_id = u.id and p.details_id = pd.id";
    db.all(sql, [], (err, rows) => {
      if (err) reject(err);
      else {
        const Products = rows.map((p) => ({
          id: p.idP,
          quantity: p.quantity,
          price: p.price,
          name: p.product,
          Farmer: p.farmer + p.surname,
        }));

        resolve(Products);
      }
    });
  });
};

const getWalletByMail = (userId, mail) => {
  return new Promise((resolve, reject) => {
    const sql1 = "SELECT * FROM users WHERE id = ? AND role = 1";
    db.all(sql1, [userId], (err, rows) => {
      if (err) reject(err);
      else if (!rows) reject("User not authorized");
    });
    const sql =
      "SELECT email, meta_value AS wallet FROM users_meta UM, users U WHERE meta_key = 'wallet' AND user_id = U.id AND email = ?";
    db.all(sql, [mail], (err, rows) => {
      if (err) reject(err);
      else if (!rows.length) reject("User not found!");
      else resolve({ wallet: rows[0].wallet });
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
      "select p.id AS idP, b.quantity, price, u.name AS farmer, surname, pd.name as product from products p, users u, products_detalis pd, basket b where p.farmer_id = u.id and p.details_id = pd.id and p.id = b.product_id and b.user_id = ?";
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

  // POST /api/newClient
  app.post(
    "/api/newClient",
    /* [
      body("email").isEmail(),
      body("password").isString(),
      body("username").isString(),
      body("name").isString(),
      body("surname").isString(),
    ], */
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      try {
        await addClient(req.body);
        res.status(201).end();
      } catch (err) {
        res.status(503).json({ error: err });
      }
    }
  );

  // GET /wallet/:mail
  app.get("/api/wallet/:mail", isLoggedIn, async (req, res) => {
    try {
      const wallet = await getWalletByMail(req.user.id, req.params.mail);
      res.json(wallet);
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
};