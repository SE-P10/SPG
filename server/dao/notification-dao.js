"use strict";

const AF_DEBUG = true;
const AF_ALLOW_DIRTY = AF_DEBUG;
const AF_DEBUG_PROCESS = AF_DEBUG;

const db = require("../db");
const { getUser } = require("./user-dao");
const {
  debugLog,
  filter_args,
  sendMail,
  runQuerySQL,
  getQuerySQL,
  isEmail,
} = require("../utility");

exports.addNotification = async (userID, message, object, email = false) => {
  let sql =
    "INSERT INTO notifications (user_id, message, object) VALUES(?, ?, ?)";

  let status = await runQuerySQL(db, sql, [userID, message, object], true);

  if (status && email) {
    if (!isEmail(email)) {
      email = (await getUser(userID)).email;
    }

    return sendMail(email, message, object);
  }

  return status;
};

exports.setNotification = async (notificationID) => {
  let sql = "UPDATE notifications SET seen = 1 WHERE id = ?";

  return runQuerySQL(db, sql, [notificationID], true);
};

exports.getNotification = async (userID, seen = null) => {
  let filter = [userID],
    sql = "SELECT * FROM notifications WHERE user_id = ?";

  if (seen !== null) {
    sql += " AND SEEN = ?";
    filter.push(seen ? 1 : 0);
  }

  return getQuerySQL(
    db,
    sql,
    filter,
    {
      id: 0,
      message: "",
      object: "",
      seen: 0,
    },
    []
  );
};

exports.execApi = (app, passport, isLoggedIn) => {
  // insert a new notification /api/notification/:userID
  app.post(
    "/api/notification/:user_id",
    AF_ALLOW_DIRTY
      ? (req, res, next) => {
          return next();
        }
      : isLoggedIn,
    async (req, res) => {
      let user = await getUser(req.params.user_id);

      if (!user) {
        res.status(400).json({ error: "Invalid user ID" });
        return;
      }

      try {
        let notifyData = filter_args(
          {
            message: "",
            object: "",
          },
          req.body || {}
        );

        let status = await this.addNotification(
          user.id,
          notifyData.message,
          notifyData.object,
          user.email || false
        );

        if (status) res.status(201).json(status).end();
        else
          res.status(400).json({ error: "Unable to insert user notification" });
      } catch (err) {
        debugLog(err);
        res.status(500).json({ error: err });
      }
    }
  );

  // update a notification /api/notification/:notificationID
  app.put(
    "/api/notification/:id",
    AF_ALLOW_DIRTY
      ? (req, res, next) => {
          return next();
        }
      : isLoggedIn,
    async (req, res) => {
      try {
        let status = await this.setNotification(req.params.id);

        if (status) res.status(201).json(status).end();
        else
          res.status(400).json({ error: "Unable to update user notification" });
      } catch (err) {
        debugLog(err);
        res.status(500).json({ error: err });
      }
    }
  );

  // get all user notification /api/notification/:userID
  app.get(
    "/api/notification/:user_id",
    AF_ALLOW_DIRTY
      ? (req, res, next) => {
          return next();
        }
      : isLoggedIn,
    async (req, res) => {
      try {
        let status = await this.getNotification(req.params.user_id);

        if (status) res.status(200).json(status).end();
        else
          res.status(404).json({ error: "Unable to get user notifications" });
      } catch (err) {
        debugLog(err);
        res.status(500).json({ error: err });
      }
    }
  );
};
