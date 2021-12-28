const { expect } = require("chai");
var supertest = require("supertest");
var server = supertest.agent("http://localhost:3001/");

describe("Login as SHOP EMPLOYEE", function () {
  const credentials = {
    username: "john.doe@demo01.it",
    password: "password",
  };

  it("GET /api/sessions should return logged user", function (done) {
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

describe("Orders", function () {
  // TODO Controll the return and filter parameter

  it("GET /api/orders/:filter?/:all? should return the user's orders", function (done) {
    server
      .get("api/orders/mariorossi@demo.it/")
      .expect(200)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
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

  it("PUT api/orders/79 should return success 201", function (done) {
    server

      .put("api/orders/79")
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
