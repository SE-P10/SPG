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

const gDao = require("./dao/products-dao");
const userDao = require("./dao/user-dao");
const walletDao = require("./dao/wallet-dao");
const ordersDao = require("./dao/orders-dao.js");
const farmerDao = require("./dao/farmer-dao.js");
const notificationDao = require("./dao/notification-dao.js");
const testDao = require("./test-dao/test-dao.js");
const { setNotification, debugLog } = require("./utility");

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
    .getUserById(id)
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

// API implemented in module gAPI
gDao.execApi(app, passport, isLoggedIn, body);
ordersDao.execApi(app, passport, isLoggedIn);
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

app.get("/api/user/:id", (req, res) => {
  try {
    userDao
      .getUserById(req.params.id)
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        res.status(503).json({});
      });
  } catch (err) {
    res.status(500).json(false);
  }
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

// POST /wallet/update/
// parameters client_email, amount
// up to the wallet the amount
app.post(
  "/api/wallet/update/",
  [body("client_email").isEmail(), body("amount").isNumeric()],
  isLoggedIn,
  function (req, res) {
    if (!validationResult(req).isEmpty())
      return res
        .status(400)
        .render("contact", { errors: "error in the parameters" });
    try {
      walletDao
        .updateWallet(req.body.amount, req.body.client_email)
        .then((res1) => {
          res.status(200).json({ result: res1 });
        })
        .catch((err) => {
          console.log(err);
          res.status(503).json({ result: err });
        });
    } catch (err) {
      res.status(500).json(false);
    }
  }
);

app.get("/api/users/:client_email", isLoggedIn, (req, res) => {
  try {
    userDao
      .getuserId(req.params.client_email)
      .then((orders) => {
        res.status(200).json(orders);
      })
      .catch((err) => {
        res.status(503).json({});
      });
  } catch (err) {
    res.status(500).json(false);
  }
});

// GET /api/products/farmer/:farmer_id
// get all the products of a farmer
app.get("/api/products/farmer/:farmer_id", isLoggedIn, (req, res) => {
  try {
    farmerDao
      .getProducts(req.params.farmer_id)
      .then((products) => {
        res.status(200).json(products);
      })
      .catch((err) => {
        res.status(503).json({});
      });
  } catch (err) {
    res.status(500).json(false);
  }
});

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

// POST /wallet/update/
// parameters product_id, amount
// update the value of the product to the new value
app.put(
  "/api/farmer/products/update/:product_id/:quantity/:farmer_id/:price",
  [check(["farmer_id"]).isInt()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).end();
    }
    try {
      await farmerDao.updateProducts(
        req.params.farmer_id,
        req.params.product_id,
        req.params.quantity,
        req.params.price
      );
      res.status(200).end();
    } catch (err) {
      res.status(503).end();
    }
  }
);

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
