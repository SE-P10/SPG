"use strict";

const express = require("express");
const morgan = require("morgan"); // logging middleware
const passport = require("passport");
const { check, validationResult, body } = require("express-validator"); // validation middleware
const LocalStrategy = require("passport-local").Strategy; // username+psw
const session = require("express-session");

const gDao = require("./dao/products-dao");
const userDao = require("./dao/user-dao");
const walletDao = require("./dao/wallet-dao");
const ordersDao = require("./dao/orders-dao.js");
const farmerDao = require("./dao/farmer-dao.js");

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
  })
);

// init Passport to use sessions
app.use(passport.initialize());
app.use(passport.session());

// API implemented in module gAPI
gDao.execApi(app, passport, isLoggedIn);
ordersDao.execApi(app, passport, isLoggedIn);

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

// POST /wallet/update/
// parameters product_id, amount
// update the value of the product to the new value
app.put(
  "/api/farmer/products/update/:product_id/:quantity/:farmer_id",
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
        req.params.quantity
      );
      res.status(200).end();
    } catch (err) {
      res.status(503).end();
    }
  }
);

/*** Other express-related instructions ***/

// Activate the server
app.listen(port, () => {
  console.log(`react-score-server-mini listening at http://localhost:${port}`);
});
