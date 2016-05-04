var express = require('express');
var router = express.Router();

var mongoose = require("mongoose");
var UserModel = mongoose.model("User");

/* GET users listing. */
router.post("/", function(req, res, next) {
  var user = new UserModel(req.body);
  user.save(function(err) {
    if (err) next(err);
    else res.send(user);
  });
});

router.get("/", function(req, res) {
  UserModel.find({}, function(err, user) {
    if (err) next(err);
    else res.send(user);
  });
});

router.put("/:id", function(req, res) {
  var id = req.params.id;
  var updates = req.body;
  UserModel.findByIdAndUpdate(id, 
    {$set: updates}, 
    {new: true}, 
    function(err, user) {
      if (err) next(err);
      else if (!user) next();
      else res.send(user);
    });
});

module.exports = router;

