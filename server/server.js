"use strict";

const IS_DEBUG = false;
const DEBUG_ALLOW_DIRTY = IS_DEBUG;
const DEBUG_PROCESS = IS_DEBUG;

const express = require("express");
const morgan = require("morgan"); // logging middleware
const passport = require("passport");
const { check, validationResult, body } = require("express-validator"); // validation middleware
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
    time: null
  })
);

function getTime() {
  if (session.time)
    return session.time;
  return ({ weekDay: dayjs().format('dddd'), hour: Number(dayjs().format('H')) });
}

// init Passport to use sessions
app.use(passport.initialize());
app.use(passport.session());


app.use(virtualCron.run(() => {

  let virtualTime = session.time || dayjs().unix();

  // virtualCron.unscheduleAll();

  virtualCron.schedule(virtualCron.times.ONCE_A_MINUTE / 30, (time, ...args) => {

    console.log("FIRST", dayjs.unix(time).format('YYYY-MM-DD <HH:mm:ss>'), 'ciao-oaic', args);

  }, [], virtualTime, true);


  virtualCron.schedule(virtualCron.times.ONCE_A_SECOND * 10, (time, ...args) => {

    console.log("SECOND", dayjs.unix(time).format('YYYY-MM-DD <HH:mm:ss>'), 'ciao-oaic', args);

  }, [], virtualTime, true);

  // virtualCron.debug();

}));

// API implemented in module gAPI
userDao.execApi(app, passport, isLoggedIn);
productsDao.execApi(app, passport, isLoggedIn, body);
ordersDao.execApi(app, passport, isLoggedIn);

farmerDao.execApi(app, passport, isLoggedIn);
walletDao.execApi(app, passport, isLoggedIn);
notificationDao.execApi(app, passport, isLoggedIn);


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


//PUT /api/debug/time/
app.put("/api/debug/time/",
  isLoggedIn,
  [
    body('hour').isNumeric(),
  ],
  function (req, res) {
    if (!validationResult(req).isEmpty() || !['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'enddebug'].includes(req.body.weekDay.toLowerCase()))
      return res.status(400).render('contact', { errors: "error in the parameters" });
    if (req.user.role != 1)
      res.status(404).json({ "result": 'Only the manager has access to this functionality!' });
    if (req.body.weekDay === 'endDebug') session.time = null;
    else session.time = req.body;
    res.status(201).end();
  }
);

// DELETE /api/clients/:email
app.delete('/api/clients/:email', async function (req, res) {
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
app.delete('/api/test/restoretables/', async function (req, res) {
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