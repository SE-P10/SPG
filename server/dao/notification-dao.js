'use strict';

const AF_DEBUG = false;
const AF_ALLOW_DIRTY = AF_DEBUG;
const AF_DEBUG_PROCESS = AF_DEBUG;

const db = require("../db");
const { getUserById } = require("./user-dao");
const { debugLog, filter_args } = require("../utility");


async function addNotification(userID, message, object, email = false) {

    let sql = 'INSERT INTO notification (user_id, message, object) VALUES(?, ?, ?)';

    let status = await this.runQuerySQL(db, sql, [userID, message, object], true);

    if (status && email) {

        return this.sendMail(email, message, object);
    }

    return status;
}


async function setNotification(notificationID) {

    let sql = 'UPDATE notification SET seen = 1 WHERE id = ?';

    return this.runQuerySQL(db, sql, [notificationID], true);
}


async function getNotification(userID, seen = 0) {

    seen = seen ? 1 : 0;

    let sql = 'SELECT * FROM notifications WHERE user_id = ? AND seen = ?';

    return await getQuerySQL(db, sql, [userID, seen], {
        id: 0,
        message: '',
        object: '',
        seen: 0
    }, []);
}


exports.execApi = (app, passport, isLoggedIn) => {

    // insert a new notification /api/notification/:userID
    app.post('/api/notification/:user_id', AF_ALLOW_DIRTY ? (req, res, next) => { return next() } : isLoggedIn, async (req, res) => {

        let user = await getUserById(req.params.user_id);

        if (!user) {
            res.status(501).json({ error: 'Invalid user ID' });
            return;
        }

        try {

            let notifyData = filter_args({
                message: '',
                object: ''
            }, req.body || {});

            let status = await addNotification(user.id, notifyData.message, notifyData.object, user.email || false);

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
                res.status(400).json({ error: 'Unable to update user notification' });

        } catch (err) {
            debugLog(err)
            res.status(503).json({ error: err });
        }
    });

    // get all user notification /api/notification/:userID
    app.get('/api/notification/:user_id', AF_ALLOW_DIRTY ? (req, res, next) => { return next() } : isLoggedIn, async (req, res) => {

        try {
            let status = await getNotification(req.params.id, 0);

            if (status)
                res.status(201).json(status).end();
            else
                res.status(400).json({ error: 'Unable to get user notifications' });

        } catch (err) {
            debugLog(err)
            res.status(503).json({ error: err });
        }
    });
}