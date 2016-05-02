var request = require("supertest");
var app = require("../../app");
var chai = require("chai");
chai.use(require("chai-things"));
var expect = chai.expect;


// API tests
describe("Restaurants API", function() {
  var restaurantResource;

  it("create a restaurant", function(done) {
    var restaurant = { 
      name: "Test Restaurant",
      location: "New location"
    };
    
    request(app)
      .post("/restaurants")
      .send(restaurant)
      .expect(200)
      .end(function(err, resp) {
        if (err) done(err);
        expect(resp.body).to.have.property("name", restaurant.name);
        expect(resp.body).to.have.property("_id");
        restaurantResource = resp.body;
        done();
      });
  });

  it("get a restaurant", function(done) {
    request(app)
      .get("/restaurants/" + restaurantResource._id)
      .expect(200)
      .end(function(err, resp) {
        if (err) done(err);
        expect(resp.body).to.have.property("_id", restaurantResource._id);
        expect(resp.body).to.have.property("name", "Test Restaurant");
        done();
      });
  });

  it("update restaurants", function(done) {
    var update = { name: "Updated Test Restaurant" };
    request(app)
      .put("/restaurants/" + restaurantResource._id)
      .send(update)
      .expect(200)
      .end(function(err, resp) {
        if (err) done(err);
        expect(resp.body).to.have.property("_id", restaurantResource._id);
        expect(resp.body).to.have.property("name", update.name);
        restaurantResource = resp.body;
        done();
      });
  });

  it("get all restaurants", function(done) {
    request(app)
      .get("/restaurants")
      .expect(200)
      .end(function(err, resp) {
        if (err) done(err);
        expect(resp.body).to.all.have.property("_id");
        expect(resp.body).to.include.something.with.property("name", restaurantResource.name);
        done(); 
      });
  });

  it("delete restaurant", function(done) {
    request(app)
      .delete("/restaurants/" + restaurantResource._id)
      .expect(200, done);
  });

  it("get a non-existent restaurant", function(done) {
    request(app)
      .get("/restaurants/" + restaurantResource._id)
      .expect(404, done);
  });

  it("put a non-existent restaurant", function(done) {
    request(app)
      .put("/restaurants/" + restaurantResource._id)
      .send({ name: "put update" })
      .expect(404, done);
  });

  it("create a restaurant without a name", function(done) {
    request(app)
      .post("/restaurants")
      .send({})
      .expect(400, done);
  });
});


