/*  notification-dao.js 
POST /api/notification/:user_id
PUT /api/notification/:id
GET /api/notification/:user_id */

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

describe("Notifications", function () {
  const notification = {
    message: "Notification",
    object: "Not1",
  };

  it("POST /api/notification/:user_id should return success", function (done) {
    server
      .post("api/notification/2")
      .send(notification)
      .expect(201)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  it("PUT /api/notification/:id should return 201", function (done) {
    server
      .put("api/notification/1 ")
      .expect(201)
      // .expect("Content-type", /json/)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  it("GET /api/notification/:user_id should return 200, it should return the list of all the user_id notifications", function (done) {
    server
      .get("api/notification/2")
      .expect(200)
      // .expect("Content-type", /json/)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
});
