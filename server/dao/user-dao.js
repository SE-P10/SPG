"use strict";
/* Data Access Object (DAO) module for accessing users */

const db = require("../db");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const { runQuerySQL, getQuerySQL, isEmail } = require("../utility");

// delete an existing client
exports.deleteUser = (userMail) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM users WHERE email = ?";
    db.run(sql, [userMail], function (err) {
      if (err) {
        reject(err);
        console.log(err);
        return;
      } else resolve(null);
    });
  });
};

/**
 *
 * @param {Number} userID_eMail
 * @param {String} password
 * @returns {Object|Boolean|null}
 */
exports.getUser = async (userID_eMail, password = false) => {
  if (!userID_eMail) return null;

  let sql =
    "SELECT * FROM users WHERE " +
    (isEmail(userID_eMail) ? "email" : "id") +
    " = ?";

  let filterObj = {
    id: 0,
    name: "",
    role: "client",
    email: "",
  };

  if (password) {
    filterObj["password"] = "";
  }

  let user = await getQuerySQL(db, sql, [userID_eMail], filterObj, null, true);

  if (user && password) {
    let userPassword = user.password;

    // prevent sensitive data disclosure
    delete user.password;

    return (await bcrypt.compare(password, userPassword)) ? user : false;
  }

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

exports.execApi = (app, passport, isLoggedIn) => {
  app.get("/api/users/:id", async (req, res) => {
    try {
      let user = await this.getUser(req.params.id);

      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({});
      }
    } catch (err) {
      res.status(500).json(false);
    }
  });

  // POST /api/newClient
  app.post("/api/newClient", async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      await addClient(req.body);
      res.status(201).end();
    } catch (err) {
      res.status(500).json({ error: err });
    }
  });
};
