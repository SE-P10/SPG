/* user-dao.js - Desi
GET /api/users/:id
POST /api/newClient */

const { expect } = require("chai");
var supertest = require("supertest");
var server = supertest.agent("http://localhost:3001/");

describe("Login as SHOP EMPLOYEE", function () {
  const credentials = {
    username: "john.doe@demo01.it",
    password: "password",
  };

  it("POST /api/sessions should return logged user", function (done) {
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

  it("POST /api/newClient should return 500 user already exists", function (done) {
    const newClient = {
      email: "new.client11@demo.it",
      password: "password",
      username: "username",
      name: "username",
      surname: "surname",
    };
    server
      .post("api/newClient")
      .send(newClient)
      .expect(500)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  it("POST /api/newClient should return 500 client already exists", function (done) {
    const newClient = {
      email: "new.client@demo.it",
      password: "password",
      username: "username",
      name: "username",
      surname: "surname",
    };
    server
      .post("api/newClient")
      .send(newClient)
      .expect(500)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
});
