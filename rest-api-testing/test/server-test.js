const { expect } = require("chai");
const { validationResult } = require("express-validator");
var supertest = require("supertest");
var server = supertest.agent("http://localhost:3001/");

// POST /api/sessions
// GET /api/sessions/current
// DELETE /api/sessions/current
// DELETE /api/clients/:email
// DELETE /api/test/restoretables

describe("SESSION", function() {
  const credentials = {
    username: "paolobianchi@demo.it",
    password: "password",
  };

  it("POST api/sessions LOGIN USER should return success", function(done) {
    server
      .post("api/sessions")
      .send(credentials)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  it("GET api/sessions/current GET SESSION INFO should return the products", function(done) {
    server
      .get("api/products")
      .expect(200)
      .expect("Content-type", /json/)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  it("DELETE /api/sessions/current LOGOUT USER should return success", function(done) {
    server.delete("api/sessions/current").end(function(err, res) {
      if (err) {
        done(err);
      } else {
        done();
      }
    });
  });

  it("DELETE /api/clients/:email DELETE USER should return success", function(done) {
    server.delete("api/clients/paolobianchi@demo.it")
      .expect(201)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  it("DELETE /api/test/restoretables RESTORE TABLES should return success", function(done) {
    server.delete("api/test/restoretables")
      .expect(201)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
});
