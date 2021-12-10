const { expect } = require("chai");
const { validationResult } = require("express-validator");
var supertest = require("supertest");
// assert = require('assert');

// var should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:3001/");

function checkType(res, types) {
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
}

// UNIT test begin

// LOGIN as SHOPEMPLOYEE
describe("Login as SHOPEMPLOYEE", function () {
  const credentials = {
    // username: "mariorossi@demo.it",
    username: "john.doe@demo01.it",
    password: "password",
  };

  it("GET api/sessions should return logged user", function (done) {
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

describe("User", function () {
  it("GET api/users/mariorossi@demo.it/ should return the user ", function (done) {
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

describe("Products", function () {
  it("GET api/products should return the products", function (done) {
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

describe("Add a new client", function () {
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
});

// TODO Test what should be the input and output
describe("Virtual time", function () {
  it("PUT api/debug/time/Wed Dec 08 2021 18:00:03 GMT+0100 should return the offset from real time in seconds", function (done) {
    server
      .put("api/debug/time/Wed Dec 08 2021 18:00:03 GMT+0100")
      // .expect("Content-type", /json/)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  it("GET api/debug/time/ should return an object with ofset and time", function (done) {
    server
      .get("api/debug/time/")
      .expect("Content-type", /json/)
      .end(function (err, res) {
        // if (!checkType(res.body, [int, int]))
        //   console.log("error get api/debug/time");
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
});

describe("Notifications", function () {
  it("POST api/notification/1 should return success or fail", function (done) {
    server
      .post("api/notification/1")
      .send({
        message: "test message",
        object: "test object",
      })
      // .expect(200)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          expect(res.statusCode).to.equal(201);
          done();
        }
      });
  });

  it("PUT api/notification/1 should return success or fail", function (done) {
    server
      .put("api/notification/1")
      // .expect(200)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          expect(res.statusCode).to.equal(201);
          done();
        }
      });
  });
  // TODO Controll the output of the request
  it("GET api/notification/1 should return all the notification of a specific user", function (done) {
    server
      .get("api/notification/1")
      .expect("Content-type", /json/)
      .end(function (err, res) {
        // if (!checkType(res.body, [int, str, str, int]))
        //   console.log("error get api/notification/1");
        if (err) {
          done(err);
        } else {
          expect(res.statusCode).to.equal(201);
          done();
        }
      });
  });
});

describe("Orders", function () {
  // TODO Controll the return and filter parameter

  it("GET api/orders/mariorossi@demo.it/ should return the user's orders", function (done) {
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

  it("GET api/orders/1 should return an array of orders or a single one", function (done) {
    server
      .get("api/orders/1")
      .expect("Content-type", /json/)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          expect(res.statusCode).to.equal(200);
          done();
        }
      });
  });

  // TODO Controll the parameters of the request
  it("POST api/orders/5 should return success or fail", function (done) {
    server
      .post("api/orders/5")
      .send({
        order: {
          status: "",
          pickup_time: "",
          pickup_place: "Torino",
        },
        products: [
          {
            product_id: 1,
            quantity: 2,
          },
        ],
      })
      // .expect(200)
      .end(function (err, res) {
        // if (!checkType(res.body, [int, int])) { console.log("error post api/orders/1"); }
        if (err) {
          done(err);
        } else {
          expect(res.statusCode).to.equal(201);
          done();
        }
      });
  });

  it("PUT api/orders/51 should return success 201", function (done) {
    server

      .put("api/orders/51")
      .send({
        order: {
          status: "pending",
          /*   pickup_time: "",
          pickup_place: "",
         */
        },
        products: [
          {
            product_id: 19,
            quantity: 0,
          },
        ],
      })
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

// TODO Controllare esegue, ma errori con promise
describe("Wallet", function () {
  it("GET api/wallet/mariorossi@demo.it should return the wallet amount", function (done) {
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

  it("POST api/wallet/update/ should return success or fail", function (done) {
    server
      .post("api/wallet/update/")
      .send({
        client_email: "mariorossi@demo.it",
        amount: 10,
      })
      // .expect(200)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
});

describe("Basket", function () {
  it("POST api/basketProduct should return success or fail", function (done) {
    server
      .post("api/basketProduct")
      .send({
        product_id: 1,
        quantity: 4,
      })
      // .expect(200)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          expect(res.statusCode).to.equal(201);
          done();
        }
      });
  });

  it("DELETE api/basketProduct should return success or fail", function (done) {
    server
      .delete("api/basketProduct")
      // .expect(200)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          expect(res.statusCode).to.equal(201);
          done();
        }
      });
  });

  // TODO Controll the return object
  it("GET api/basketProduct should return the list of the products in basket associated with the user that called the API", function (done) {
    server
      .get("api/basketProduct")
      .expect(200)
      .end(function (err, res) {
        // if (!checkType(res.body, [int, int, int, str, str]))
        //   console.log("error get api/basketProduct");
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
});

describe("Logout as SHOPEMPLOYEE", function () {
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

// LOGIN as FARMER
describe("Login as FARMER", function () {
  const credentials = {
    username: "paolobianchi@demo.it",
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

describe("Farmer", function () {
  // TODO Controll the return object
  it("GET api/products/farmer/1 should return a list of the products of the farmer", function (done) {
    server
      .get("api/products/farmer/1")
      // .expect(200)
      .end(function (err, res) {
        // if (!checkType(res.body, [int, int]))
        //   console.log("error get api/products/farmer/1");
        if (err) {
          done(err);
        } else {
          expect(res.statusCode).to.equal(200);
          done();
        }
      });
  });

  it("POST api/farmer/products/update should return success or fail", function (done) {
    server
      .post("api/farmer/products/update")
      .send({
        farmer_id: 4,
        product_id: 2,
        amount: 200,
        price: 20,
      })
      // .expect(200)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
});

describe("Logout as FARMER", function () {
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
