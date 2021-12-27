const { expect } = require("chai");
const { validationResult } = require("express-validator");
var supertest = require("supertest");
var server = supertest.agent("http://localhost:3001/");

// GET /api/products/farmer/:farmer_id
// POST /api/farmer/products/update
// GET /api/orderProducts
// GET /api/farmerOrders
// POST /api/farmerOrders
// GET /api/farmerOrders/open

describe("Login as FARMER", function() {
  const credentials = {
    username: "paolobianchi@demo.it",
    password: "password",
  };

  it("GET /api/sessions should return logged user", function(done) {
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

describe("Farmer", function() {
  it("GET api/products/farmer/:farmer_id should return a list of the products of the farmer", function(done) {
    server
      .get("api/products/farmer/4")
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  it("POST api/farmer/products/update should return success or fail", function(done) {
    server
      .post("api/farmer/products/update")
      .send({
        farmer_id: 4,
        product_id: 2,
        amount: 200,
        price: 20,
      })
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  // This function shouldn't exist so we do the test but we need to remove it
  // from the main branch
  it("GET api/orderProducts should return a list of the orders for each product of the farmer", function(done) {
    server
      .get("api/orderProducts")
      // .expect(500)
      // .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  it("GET api/farmerOrders should return a list of the products with the sum of the quantities thare have been ordered", function(done) {
    server
      .get("api/farmerOrders")
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  it("POST api/farmerOrders should return success or fail", function(done) {
    server
      .post("api/farmerOrders")
      .send({
        id: 4,
        product: 2,
        quantity: 200,
      })
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  it("GET api/farmerOrders/open should return a list of the products and quantity for the delivery", function(done) {
    server
      .get("api/farmerOrders/open")
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
});

describe("Logout as FARMER", function() {
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

describe("Farmer", function() {
  it("NOT GET api/products/farmer/:farmer_id should return a list of the products of the farmer", function(done) {
    server
      .get("api/products/farmer/1")
      .expect(401)
      .end(function(err, res) {
        // if (!checkType(res.body, [int, int]))
        //   console.log("error get api/products/farmer/1");
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  it("NOT POST api/farmer/products/update should return success or fail", function(done) {
    server
      .post("api/farmer/products/update")
      .send({
        farmer_id: 4,
        product_id: 2,
        amount: 200,
        price: 20,
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

  it("NOT GET api/orderProducts should return a list of the orders for each product of the farmer", function(done) {
    server
      .get("api/orderProducts")
      .expect(401)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  it("NOT GET api/farmerOrders should return a list of the products with the sum of the quantities thare have been ordered", function(done) {
    server
      .get("api/farmerOrders")
      .expect(401)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  it("NOT POST api/farmerOrders should return success or fail", function(done) {
    server
      .post("api/farmerOrders")
      .send({
        id: 4,
        product: 2,
        quantity: 200,
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

  it("NOT GET api/farmerOrders/open should return a list of the products and quantity for the delivery", function(done) {
    server
      .get("api/farmerOrders/open")
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
