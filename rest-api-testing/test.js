var supertest = require("supertest");
// var should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:3001/");

// UNIT test begin

describe("SAMPLE unit test", function() {

  // #1 should return home page

  it("should return home page", function(done) {

    // calling home page api
    server
      .get("api/users/paolobianchi@demo.it/")
      // .expect("Content-type", /json/)
      .expect(200) // THis is HTTP response
      .end(function(err, res) {
        // NOTE: The .expect() failures are handled by err and is  
        //       properly passed to done. You may also add logging
        //       or other functionality here, as needed.
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

});
