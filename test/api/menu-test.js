var request = require("supertest");
var app = require("../../app");
var chai = require("chai");
chai.use(require("chai-things"));
var expect = chai.expect;

function createMenu() {
  return {
    menuItems: [
      { name: "Item 1", price: 23 },
      { name: "Item 2", price: 25 }
    ],
    description: "lunch menu"
  };
};

// API tests
describe("Menus API", function(){
  var menuResource;

  it("create a menu", function(done) {
    var menu = createMenu();
    request(app)
      .post("/menus")
      .send(menu)
      .expect(200)
      .end(function(err, resp) {
        if (err) done(err);
        expect(resp.body).to.have.property("_id");
        expect(resp.body).to.have.property("menuItems");
        expect(resp.body).to.have.property("description");
        menuResource = resp.body;
        done();
      });
  });

  it("get a menu", function(done) {
    request(app)
      .get("/menus/" + menuResource._id)
      .expect(200)
      .end(function(err, resp) {
        if (err) done(err);
        expect(resp.body).to.have.property("_id", menuResource._id);
        expect(resp.body).to.have.property("description", menuResource.description);
        done();
      });
  });

  it("update menu", function(done) {
    var update = {
      menuItems: menuResource.menuItems.concat({
        name: "Item 2", 
        price: 300
      }),
      description: "Updated description"
    };
    request(app)
      .put("/menus/" + menuResource._id)
      .send(update)
      .expect(200)
      .end(function(err, resp){
        if (err) done(err);
        expect(resp.body).to.have.property("_id", menuResource._id);
        expect(resp.body.menuItems).to.include.something.with.property("name", "Item 2");
        expect(resp.body.menuItems).to.include.something.with.property("price", "300");
        expect(resp.body).to.have.property("description", update.description);
        done();
      });
  });

  it("get all menus", function(done) {
    request(app)
      .get("/menus")
      .expect(200)
      .end(function(err, resp) {
        if (err) done(err);
        expect(resp.body).to.all.have.property("_id");
        expect(resp.body).to.include.something.with.property("description", "Updated description");
        done();
      });
  });

  it("delete menu", function() {
    request(app)
      .delete("/menus/" + menuResource._id)
      .expect(200, done);
  });

  it("get a non-existent menu", function(done) {
    request(app)
      .get("/menus/" + menuResource._id)
      .expect(404, done);
  });

  it("put a non-existent restaurant", function(done) {
    request(app)
      .put("/menus/" + menuResource._id)
      .send({})
      .expect(404, done);
  });

  it("create a menu without menuItems", function(done) {
    request(app)
      .post("/menus")
      .send({})
      .expect(400, done);
  });
});