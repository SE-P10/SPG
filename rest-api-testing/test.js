const { expect } = require("chai");
const { validationResult } = require("express-validator");
var supertest = require("supertest");

// var should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:3001/");

/* function checkType(res, types) {
  let i = 0;
  let valid = 0;
  for (var k in res) {
    console.log(k, res[k], types[i]);
    switch (types[i]) {
      case "int":
        if (!Number.isInteger(res[k])) valid++;
        break;
      case "str":
        if (typeof res[k] !== "string") valid++;
        break;
      default:
        valid++;
    }
    i++;
  }
  console.log(valid);
  if (valid > 0) return false;

  return true;
} */

// UNIT test begin

describe("Login user", function () {
  const credentials = {
    username: "mariorossi@demo.it",
    password: "password",
  };

  it("should return logged user", function (done) {
    server
      .post("api/sessions")
      .send(credentials)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
});

describe("Get User From Email", function () {
  it("should return the user ", function (done) {
    server
      .get("api/users/mariorossi@demo.it/")
      .expect("Content-type", /json/)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
});

describe("Get User's Orders From Email", function () {
  it("should return the user's orders", function (done) {
    server
      .get("api/orders/mariorossi@demo.it/")
      .expect("Content-type", /json/)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
});

describe("Get User's Orders From Email", function () {
  it("should return the user's orders", function (done) {
    server
      .get("api/orders/mariorossi@demo.it/")
      .expect("Content-type", /json/)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
});

describe("Create an Order", function () {
  it("should return success 201", function (done) {
    server
      .post("api/orders/5")
      .expect(201)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
});

describe("Create an Order", function () {
  it("should return success 201", function (done) {
    server
      .post("api/orders/5")
      .expect(201)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
});

/* describe("Update Order", function () {
  it("should return success 201", function (done) {
    server
      .post("api/orders/5/51")
      .expect(201)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
});
 */

describe("Get Products", function () {
  it("should return the products", function (done) {
    server
      .get("api/products")
      .expect("Content-type", /json/)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
});

/* describe("Add a new client", function () {
  const newClient = {
    email: "new.client@demo.it",
    password: "password",
    username: "username",
    name: "username",
    surname: "surname",
  };

  it("should return success", function (done) {
    server
      .post("api/newClient")
      .send(newClient)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
}); */

describe("Get Wallet by Email", function () {
  it("should return the wallet amount", function (done) {
    server
      .get("api/wallet/mariorossi@demo.it")
      .expect("Content-type", /json/)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
});

describe("Logout", function () {
  it("should return success", function (done) {
    server.delete("api/sessions/current").end(function (err, res) {
      if (err) {
        done(err);
      } else {
        done();
      }
    });
  });
});
