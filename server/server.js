"use strict";

const IS_DEBUG = false;
const DEBUG_ALLOW_DIRTY = IS_DEBUG;
const DEBUG_PROCESS = IS_DEBUG;

const express = require("express");
const morgan = require("morgan"); // logging middleware
const passport = require("passport");
const { validationResult, body } = require("express-validator"); // validation middleware
const LocalStrategy = require("passport-local").Strategy; // username+psw
const session = require("express-session");
const dayjs = require("dayjs");

const productsDao = require("./dao/products-dao");
const userDao = require("./dao/user-dao");
const walletDao = require("./dao/wallet-dao");
const ordersDao = require("./dao/orders-dao.js");
const farmerDao = require("./dao/farmer-dao.js");
const notificationDao = require("./dao/notification-dao.js");
const testDao = require("./dao/test-dao.js");
const { virtualCron } = require("./cron");
const { isNumber } = require("./utility");

/*** Set up Passport ***/
// set up the "username and password" login strategy
// by setting a function to verify username and password
passport.use(
  new LocalStrategy(function(username, password, done) {
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
    resave: false,
    saveUninitialized: false,
    time: null,
    timeOffset: 0
  })
);

function getVirtualTime(offset = false) {
  return (session.timeOffset || 0) + (offset ? 0 : dayjs().unix());
}


// init Passport to use sessions
app.use(passport.initialize());
app.use(passport.session());

app.use(virtualCron.run(() => {

  //virtualCron.unscheduleAll();

  let virtualTime = getVirtualTime();

  virtualCron.schedule(virtualCron.schedules.MONDAY, (time, ...args) => {

    console.log("FIRST", dayjs.unix(time).format('YYYY-MM-DD <HH:mm:ss>'), 'hello world!', args);

  }, [], false, virtualTime);

  virtualCron.schedule(virtualCron.schedules.TUESDAY, (time, ...args) => {

    console.log("SECOND", dayjs.unix(time).format('YYYY-MM-DD <HH:mm:ss>'), 'hello world!', args);

  }, [], false, virtualTime);

  //virtualCron.debug();

}, getVirtualTime(true)));

// API implemented in module gAPI
userDao.execApi(app, passport, isLoggedIn);
productsDao.execApi(app, passport, isLoggedIn, body);
ordersDao.execApi(app, passport, isLoggedIn);

farmerDao.execApi(app, passport, isLoggedIn);
walletDao.execApi(app, passport, isLoggedIn);
notificationDao.execApi(app, passport, isLoggedIn);


//PUT /api/debug/time/
app.put("/api/debug/time/:time", isLoggedIn, function(req, res) {

  let timestamp, timeOffset = 0, time = req.params.time;
  console.log(time);

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
    }
    else {
      timeOffset = time;
      time = null;
    }
  }

  /**
   * try dirrect conevrsion
   */
  timestamp = new Date(time);

  let parsedTimestamp = ((timestamp.getTime() > 0) ? dayjs(timestamp) : dayjs()).unix() + Number.parseInt(timeOffset);

  if (timeOffset === 0) {
    timeOffset = parsedTimestamp - dayjs().unix();
  }

  session.timeOffset = timeOffset;
  session.time = parsedTimestamp;

  res.status(201).end();

});


app.get("/api/debug/time/", function(req, res) {

  let response = {
    time: session.time || dayjs().unix(),
    offset: session.timeOffset || 0
  }

  res.status(201).json(response).end();

});


/*** USER APIs ***/

// Login --> POST /sessions
app.post("/api/sessions", function(req, res, next) {
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
app.delete('/api/clients/:email', async function(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
  try {
    await userDao.deleteUser(req.params.email);
    res.status(201).end();
  } catch (err) {
    console.log(err);
    res.status(503).json({ error: `Database error during the deletion of user because: ${err}.` });
  }
});

/*** API used just for the test enviroment***/
app.delete('/api/test/restoretables/', async function(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
  try {
    await testDao.restoreUsersTable();
    await testDao.restoreProductsTable();
    await testDao.restoreUsersMetaTable();
    await testDao.restoreOrderProductTable();
    await testDao.restoreOrdersTable();

    res.status(201).end();
  } catch (err) {
    console.log(err);
    res.status(503).json({ error: `Database error during the deletion of user because: ${err}.` });
  }
});

// Activate the server
app.listen(port, () => {
  console.log(`react-score-server-mini listening at http://localhost:${port}`);
});
