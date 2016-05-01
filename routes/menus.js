var express = require("express");
var router = express.Router();

var mongoose = require("mongoose");
var MenuModel = mongoose.model("Menu");

router.get("/", function(req, res, next) {
  MenuModel.find({}, function(err, menus) {
      if (err) next(err);
      res.send(menus);
  });
});

router.get("/:id", function(req, res, next) {
  var id = req.params.id;
  MenuModel.findById(id, function(err, menu) {
      if (err) next(err);
      res.send(menu);
  });
});

router.put("/:id", function(req, res, next) {
  var id = req.params.id;
  var updates = req.body;
  MenuModel.findByIdAndUpdate(id,
    {$set: udpates},
    {new: true},
    function(err, menu) {
      if (err) next(err);
      if (menu) res.send(menu);
      next();
    });
});

router.delete("/:id", function(req, res, next) {
  var id = req.params.id;
  MenuModel.findByIdAndRemove(id, function(err, menu) {
    if (err) next(err);
    res.send(menu);
  });
});

router.post("/", function(req, res, next) {
  var menu = new MenuModel(req.body);
  menu.save(function(err) {
    if (err) next(err);
    if (menu) res.send(menu);
    next();
  });
});

module.exports = router;
