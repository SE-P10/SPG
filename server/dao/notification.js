'use strict';

const AF_DEBUG = false;
const AF_ALLOW_DIRTY = AF_DEBUG;
const AF_DEBUG_PROCESS = AF_DEBUG;

const db = require("../db");
const { getUserMeta, updateUserMeta, getUserById } = require("./user-dao");
const { debugLog, setNotification } = require("../utility");


exports.execApi = (app, passport, isLoggedIn) => {


    // insert a new notification /api/notification/:user_id
    app.post('/api/notification/:user_id', AF_ALLOW_DIRTY ? (req, res, next) => { return next() } : isLoggedIn, async (req, res) => {

        let user = await getUserById(req.params.user_id);

        if (!user) {
            res.status(501).json({ error: 'Invalid user ID' });
            return;
        }

        try {
            let status = await setNotification(db, user.id, req.body.text, { to: user.email });

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