"use strict";
/* Data Access Object (DAO) module for accessing users */

const db = require("../db");
const bcrypt = require("bcrypt");

const { runQuerySQL, getQuerySQL } = require("../utility");


// delete an existing client
exports.deleteUser = (userMail) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM users WHERE email = ?';
    db.run(sql, [userMail], function (err) {
      if (err) {
        reject(err);
        console.log(err)
        return;
      } else
        resolve(null);
    });
  });
}

exports.getUserById = async (id) => {

  if (!id)
    return null;

  let user = await getQuerySQL(db, "SELECT * FROM users WHERE id = ?", [id], {
    id: 0,
    name: '',
    role: 'client',
    email: ''
  }, null, true);

  return user;
};

/**
 * @author sh1zen
 */
exports.updateUserMeta = async (userID, meta_key, meta_value) => {
  return await runQuerySQL(
    db,
    "UPDATE users_meta SET meta_value = ? WHERE user_id = ? AND meta_key = ?",
    [meta_value, userID, meta_key],
    true
  );
};

/**
 * @author sh1zen
 */
exports.getUserMeta = async (
  userID,
  meta_key,
  single = false,
  failRes = false
) => {
  return (
    (
      await getQuerySQL(
        db,
        "SELECT meta_value FROM users_meta WHERE user_id = ? AND meta_key = ?",
        [userID, meta_key],
        null,
        { meta_value: failRes },
        single
      )
    ).meta_value || failRes
  );
};

exports.getUser = (username, password) => {
  console.log(username + " " + password);
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    db.get(sql, [username], (err, row) => {
      if (err) {
        reject(err);
      } else if (row === undefined) {
        resolve(false);
      } else {
        const user = {
          id: row.id,
          name: row.name,
          role: row.role,
          email: row.email,
        };

        // check the hashes with an async call, given that the operation may be CPU-intensive (and we don't want to block the server)
        bcrypt.compare(password, row.password).then((result) => {
          if (result) resolve(user);
          else resolve(false);
        });
      }
    });
  });
};

exports.getuserId = (client_email = null) => {
  return new Promise((resolve, reject) => {
    let sql = "select * from users where users.email = ? ";
    db.all(sql, [client_email], (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }

      const orders = rows.map((user) => ({
        id: user.id,
        role: user.role,
      }));

      resolve(orders);
    });
  });
};


exports.execApi = (app, passport, isLoggedIn) => {

  app.get("/api/user/:id", async (req, res) => {

    try {

      let user = await this.getUserById(req.params.id);

      if (user) {
        res.status(200).json(user);
      }
      else {
        res.status(503).json({});
      }

    } catch (err) {
      res.status(500).json(false);
    }
  });

}