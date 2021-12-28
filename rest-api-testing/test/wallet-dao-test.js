/* ## wallet-dao.js - Desi
POST /api/wallet/update
GET /api/wallet/:mail */
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
      .expect(200)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
});
