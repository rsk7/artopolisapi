var request = require("supertest");
var app = require("../../app");
var chai = require("chai");
chai.use(require("chai-things"));
var expect = chai.expect;

function createUser() {
  return {
    facebook: {
      id: "asdfasdf"
    }
  };
};

// API tests
describe("Users API", function(){
  var userResource;

  it("create a user", function(done) {
    var user = createUser();
    request(app)
      .post("/users")
      .send(user)
      .expect(200)
      .end(function(err, resp) {
        if (err) done(err);
        expect(resp.body).to.have.property("_id");
        expect(resp.body).to.have.deep.property("facebook.id", "asdfasdf");
        userResource = resp.body;
        done();
      });
  });

  it("get a user", function(done) {
    request(app)
      .get("/users/" + userResource._id)
      .expect(200)
      .end(function(err, resp) {
        if (err) done(err);
        expect(resp.body).to.have.property("_id", userResource._id);
        expect(resp.body).to.have.deep.property("facebook.id", "asdfasdf");
        done();
      });
  });

  it("update user", function(done) {
    var update = {
      facebook: {
        id: "new id",
        email: "new email"
      }
    };
    request(app)
      .put("/users/" + userResource._id)
      .send(update)
      .expect(200)
      .end(function(err, resp){
        if (err) done(err);
        expect(resp.body).to.have.property("_id", userResource._id);
        expect(resp.body).to.have.deep.property("facebook.id", "new id");
        expect(resp.body).to.have.deep.property("facebook.email", "new email");
        done();
      });
  });

  it("get all users", function(done) {
    request(app)
      .get("/users")
      .expect(200)
      .end(function(err, resp) {
        if (err) done(err);
        expect(resp.body).to.all.have.property("_id");
        expect(resp.body).to.all.have.property("facebook");
        done();
      });
  });

  it("delete user", function(done) {
    request(app)
      .delete("/users/" + userResource._id)
      .expect(200, done);
  });

  it("get a non-existent user", function(done) {
    request(app)
      .get("/users/" + userResource._id)
      .expect(404, done);
  });

  it("put a non-existent user", function(done) {
    request(app)
      .put("/users/" + userResource._id)
      .send({})
      .expect(404, done);
  });
});