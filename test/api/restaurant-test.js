var request = require("supertest");
var app = require("../../app");

describe("Restaurants API", function() {
  it("create a restaurant", function(done) {
    var restaurant = {
      name: "Test restaurant"
    };
    request(app)
      .post("/restaurants")
      .send(restaurant)
      .expect(200, done);
  });
});