'use strict';

const AF_DEBUG = false;
const AF_ALLOW_DIRTY = AF_DEBUG;
const AF_DEBUG_PROCESS = AF_DEBUG;

const db = require("../db");
const { getUserById } = require("./user-dao");
const { debugLog } = require("../utility");


async function addNotification(userID, data, email = false) {

    let sql = 'INSERT INTO notification (user_id, data) VALUES(?, ?)';

    let status = await this.runQuerySQL(db, sql, [userID, data], true);

    if (status && email) {

        email = this.filter_args({
            to: '',
            body: data,
            subject: ''
        }, email);

        return this.sendMail(email.to, email.body, email.subject);
    }

    return status;
}


async function setNotification(notificationID) {

    let sql = 'UPDATE notification SET seen = 1 WHERE id = ?';

    return this.runQuerySQL(db, sql, [notificationID], true);
}


exports.execApi = (app, passport, isLoggedIn) => {

    // insert a new notification /api/notification/:user_id
    app.post('/api/notification/:user_id', AF_ALLOW_DIRTY ? (req, res, next) => { return next() } : isLoggedIn, async (req, res) => {

        let user = await getUserById(req.params.user_id);

        if (!user) {
            res.status(501).json({ error: 'Invalid user ID' });
            return;
        }

        try {
            let status = await addNotification(user.id, req.body.text, { to: user.email });

            if (status)
                res.status(201).json(status).end();
            else
                res.status(400).json({ error: 'Unable to insert user notification' });

        } catch (err) {
            debugLog(err)
            res.status(503).json({ error: err });
        }

    });

    // update a notification /api/notification/:notificationID
    app.put('/api/notification/:id', AF_ALLOW_DIRTY ? (req, res, next) => { return next() } : isLoggedIn, async (req, res) => {

        try {
            let status = await setNotification(req.params.id);

            if (status)
                res.status(201).json(status).end();
            else
                res.status(400).json({ error: 'Unable to insert user notification' });

        } catch (err) {
            debugLog(err)
            res.status(503).json({ error: err });
        }

    });
}