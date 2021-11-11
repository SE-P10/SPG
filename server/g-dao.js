const db = require("./db");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");

const addClient = async (newClient) => {
  	return new Promise((resolve, reject) => {
		const sql = "INSERT into users VALUES((SELECT MAX(id)+1 FROM users), ?, ?, ?, 0, ?, ?, 0)";
			bcrypt.hash(newClient.password, 10).then(passwordHash => {
				db.run(sql, [newClient.email, passwordHash, newClient.username, newClient.name, newClient.surname], (err) => {
					if (err) reject(err);
					resolve(this.lastID);
				});
			});
	});
};

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

exports.execApi = (app, passport, isLoggedIn) => {

    app.get('/api/products', async (req, res) => {
        try {
			const Products = await listProducts();
			res.json(Products);
        } catch(err) {
        	res.status(500).end();
        }
    });

    // POST /api/newClient
    app.post('/api/newClient', isLoggedIn, async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({errors: errors.array()});
		}
		try {
			await addClient(req.body);
			res.status(201).end();
		} catch(err) {
			res.status(503).json({error: err});
		}
	});

}