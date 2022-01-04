"use strict";

const IS_DEBUG = false;
const DEBUG_ALLOW_DIRTY = IS_DEBUG;
const DEBUG_PROCESS = IS_DEBUG;

const ENABLE_CRON = true;

const db = require("./db");
const express = require("express");
const morgan = require("morgan"); // logging middleware
const passport = require("passport");
const { validationResult, body } = require("express-validator"); // validation middleware
const LocalStrategy = require("passport-local").Strategy; // username+psw
const session = require("express-session");
const sqliteStoreFactory = require("express-session-sqlite").default;
const sqlite3 = require("sqlite3");
const dayjs = require("dayjs");
const { runQuerySQL, getQuerySQL, dynamicSQL, sendMail } = require("./utility");

const productsDao = require("./dao/products-dao");
const userDao = require("./dao/user-dao");
const walletDao = require("./dao/wallet-dao");
const ordersDao = require("./dao/orders-dao.js");
const farmerDao = require("./dao/farmer-dao.js");
const notificationDao = require("./dao/notification-dao.js");
const warehouseDao = require("./dao/warehouse-dao.js");
const testDao = require("./dao/test-dao.js");
const time = require("./time.js");
const { virtualCron } = require("./cron");
const { isNumber } = require("./utility");

const { notifyTelegram } = require("./telegram");

/*** Set up Passport ***/
// set up the "username and password" login strategy
// by setting a function to verify username and password
passport.use(
  new LocalStrategy(function (username, password, done) {
    userDao.getUser(username, password).then((user) => {
      if (!user)
        return done(null, false, {
          message: "Incorrect username and/or password.",
        });

      return done(null, user);
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  userDao
    .getUser(id)
    .then((user) => {
      done(null, user); // req.user
    })
    .catch((err) => {
      done(err, null);
    });
});

// init express
const app = express();
const port = 3001;
const SqliteStore = sqliteStoreFactory(session);

// set-up the middlewares
app.use(morgan("dev"));
app.use(express.json());

// custom middleware: check if a given request is coming from an authenticated user
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();

  return res.status(401).json({ error: "Not authenticated!" });
};

// enable sessions in Express
app.use(
  session({
    // set up here express-session
    secret: "ajs5sd6f5sd6fiufadds8f9865d6fsgeifgefleids89fwu",
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: true,
      maxAge: 3600000,
    },
    store: new SqliteStore({
      driver: sqlite3.Database,
      path: "sessions.db",
      ttl: 3600000,
      prefix: "sessid:",
      cleanupInterval: 300000,
    }),
  })
);

// init Passport to use sessions
app.use(passport.initialize());
app.use(passport.session());

if (ENABLE_CRON) {
  app.use(virtualCron.run(() => {

    // reset all cron jobs on server restart
    virtualCron.unscheduleAll();

    virtualCron.schedule("confrimOrders",
      {
        from: { day: virtualCron.schedules.MONDAY, hour: 9 },
        to: { day: virtualCron.schedules.WEDNESDAY, hour: 9 },
      },
      (virtualTime, lastExecutionTime, ...args) => {

        console.log("A")
          ordersDao.confrimOrders(virtualTime);
      },
      [],
      false
    );


    virtualCron.schedule("deletePendingOrders",
      {
        from: { day: virtualCron.schedules.MONDAY, hour: 23 },
        to: { day: virtualCron.schedules.SATURDAY, hour: 9 },
      },
      (virtualTime, lastExecutionTime, ...args) => {
        console.log("B")
        ordersDao.deletePendingOrders();
      },
      [],
      false
    );

    /**
    * delete unretrived orders
    */
    virtualCron.schedule("unretrivedOrders",
      virtualCron.schedules.FRIDAY,
      (virtualTime, lastExecutionTime, ...args) => {

        console.log("C")

        let days = virtualCron.calcDateDiff(virtualTime, lastExecutionTime);

        if (days > 0 || (days === 0 && virtualTime.hour() >= 23)) {

          (async () => {

            await runQuerySQL(db, "UPDATE orders SET status = 'deleted' WHERE status = 'confirmed' AND timestamp <= ? ", [virtualTime.startOf('week').unix()]);
            await productsDao.notifyUnretireverUsers();

          })();

        }
      },
      [],
      false
    );

    /**
     * Telegram Cron Job
    */
    virtualCron.schedule("telegramBOT",
      virtualCron.schedules.SATURDAY,
      (virtualTime, lastExecutionTime, ...args) => {

        console.log("D")

        let days = virtualCron.calcDateDiff(virtualTime, lastExecutionTime);

        if (days > 0 || (days === 0 && virtualTime.hour() > 9)) {
          notifyTelegram();
        }

      },
      [],
      false
    );
  })
  );
}

// API implemented in DAO modules
userDao.execApi(app, passport, isLoggedIn);
productsDao.execApi(app, passport, isLoggedIn, body);
ordersDao.execApi(app, passport, isLoggedIn);

farmerDao.execApi(app, passport, isLoggedIn);
walletDao.execApi(app, passport, isLoggedIn);
notificationDao.execApi(app, passport, isLoggedIn);
warehouseDao.execApi(app, passport, isLoggedIn);

//PUT /api/debug/time/
app.put("/api/debug/time/:time", isLoggedIn, function (req, res) {
  let timestamp,
    timeOffset = 0,
    time = req.params.time;

  if (isNumber(time)) {
    /**
     * is not an offset
     */
    if (time > 1000000000) {
      /**
       * is not in milliseconds
       */
      if (time < 1000000000000) {
        time = time * 1000;
      }
    } else {
      timeOffset = time;
      time = null;
    }
  }

  /**
   * try dirrect conevrsion
   */
  timestamp = new Date(time);

  let parsedTimestamp =
    (timestamp.getTime() > 0 ? dayjs(timestamp) : dayjs()).unix() +
    Number.parseInt(timeOffset);

  if (timeOffset === 0) {
    timeOffset = parsedTimestamp - dayjs().unix();
  }

  req.session.timeOffset = timeOffset;
  req.session.time = parsedTimestamp;

  res.status(201).json(timeOffset).end();
});

app.get("/api/debug/time/", function (req, res) {
  let response = {
    time: req.session.time || dayjs().unix(),
    offset: req.session.timeOffset || 0,
  };

  res.status(200).json(response).end();
});

/*** USER APIs ***/

// Login --> POST /sessions
app.post("/api/sessions", function (req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      // display wrong login messages
      return res.status(401).json(info);
    }
    // success, perform the login
    req.login(user, (err) => {
      if (err) return next(err);

      // req.user contains the authenticated user, we send all the user info back
      // this is coming from userDao.getUser()
      return res.json(req.user);
    });
  })(req, res, next);
});

// Logout --> DELETE /sessions/current
app.delete("/api/sessions/current", (req, res) => {
  req.logout();
  res.end();
});

// GET /sessions/current
// check whether the user is logged in or not
app.get("/api/sessions/current", isLoggedIn, (req, res) => {
  res.status(200).json(req.user);
});

// DELETE /api/clients/:email
app.delete("/api/clients/:email", async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    await userDao.deleteUser(req.params.email);
    res.status(201).end();
  } catch (err) {
    console.log(err);
    res.status(503).json({
      error: `Database error during the deletion of user because: ${err}.`,
    });
  }
});

/*** API used just for the test enviroment***/
app.delete("/api/test/restoretables/", async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    await testDao.restoreUsersTable();
    await testDao.restoreProductsTable();
    await testDao.restoreUsersMetaTable();
    await testDao.restoreOrderProductTable();
    await testDao.restoreOrdersTable();
    await testDao.restoreBasketTable();
    await testDao.restoreFarmerPayments();

    res.status(201).end();
  } catch (err) {
    console.log(err);
    res.status(503).json({
      error: `Database error during the deletion of user because: ${err}.`,
    });
  }
});

// Activate the server
app.listen(port, () => {
  console.log(`react-score-server-mini listening at http://localhost:${port}`);
});
