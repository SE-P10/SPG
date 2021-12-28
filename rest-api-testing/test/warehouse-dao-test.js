const { expect } = require("chai");
var supertest = require("supertest");
var server = supertest.agent("http://localhost:3001/");

describe("Login as WAREHOUSE MANAGER", function () {
  const credentials = {
    username: "hallbicocca@gmail.com",
    password: "password",
  };

  it("POST /api/sessions should return logged user", function (done) {
    server
      .post("api/sessions")
      .send(credentials)
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

describe("Warehouse", function () {
  it("GET /api/warehouse/openDeliveries should return all the open deliveries", function (done) {
    server
      .get("api/notification/2")
      .expect(200)
      .expect("Content-type", /json/)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  it("PUT /api/warehouse/openDeliveries/:delivery_id should return 200", function (done) {
    server
      .put("api/warehouse/openDeliveries/80 ")
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
