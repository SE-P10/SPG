const { expect } = require("chai");
const { validationResult } = require("express-validator");
var supertest = require("supertest");
var server = supertest.agent("http://localhost:3001/");

// GET /api/products
// POST /api/basketProduct
// DELETE /api/basketProduct
// GET /api/basketProduct
// GET /api/products/unretrived

describe("Login as SHOPEMPLOYEE", function() {
  const credentials = {
    username: "john.doe@demo01.it",
    password: "password",
  };

  it("GET api/sessions should return logged user", function(done) {
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
});

describe("Products", function() {
  it("GET api/products should return the products", function(done) {
    server
      .get("api/products")
      .expect("Content-type", /json/)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  it("POST api/basketProduct should return success or fail", function(done) {
    server
      .post("api/basketProduct")
      .send({
        product_id: 1,
        quantity: 4,
      })
      .expect(201)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  it("DELETE api/basketProduct should return success or fail", function(done) {
    server
      .delete("api/basketProduct")
      .expect(201)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  // TODO Controll the return object
  it("GET api/basketProduct should return the list of the products in basket associated with the user that called the API", function(done) {
    server
      .get("api/basketProduct")
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
});

describe("Logout as SHOPEMPLOYEE", function() {
  it("should return success", function(done) {
    server.delete("api/sessions/current").end(function(err, res) {
      if (err) {
        done(err);
      } else {
        done();
      }
    });
  });
});

// TODO add credential for MANAGER
describe("Login as MANAGER", function() {
  const credentials = {
    username: "john.doe@demo01.it",
    password: "password",
  };

  it("GET api/sessions should return logged user", function(done) {
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
});

describe("Products MANAGER", function() {
  it("GET api/products/unretrived should return a list of the products that where never been retrived", function(done) {
    server
      .get("api/products/unretrived")
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
});

describe("Logout as MANAGER", function() {
  it("should return success", function(done) {
    server.delete("api/sessions/current").end(function(err, res) {
      if (err) {
        done(err);
      } else {
        done();
      }
    });
  });
});

describe("Products", function() {
  it("NOT POST api/basketProduct should return success or fail", function(done) {
    server
      .post("api/basketProduct")
      .send({
        product_id: 1,
        quantity: 4,
      })
      .expect(401)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  it("NOT DELETE api/basketProduct should return success or fail", function(done) {
    server
      .delete("api/basketProduct")
      .expect(401)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  // TODO Controll the return object
  it("NOT GET api/basketProduct should return the list of the products in basket associated with the user that called the API", function(done) {
    server
      .get("api/basketProduct")
      .expect(401)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  it("NOT GET api/products/unretrived should return a list of the products that where never been retrived", function(done) {
    server
      .get("api/products/unretrived")
      .expect(401)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
});



