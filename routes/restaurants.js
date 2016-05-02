var express = require('express');
var router = express.Router();

var mongoose = require("mongoose");
var RestaurantModel = mongoose.model("Restaurant");

router.get('/', function(req, res, next) {
  RestaurantModel.find({}, function(err, restaurants) {
    if (err) next(err);
    res.send(restaurants);
  });
});

router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  RestaurantModel.findById(id, function(err, restaurant) {
    if (err) next(err);
    if (!restaurant) next();
    else res.send(restaurant);
  });
});

router.put('/:id', function(req, res, next) {
  var id = req.params.id;
  var updates = req.body;
  RestaurantModel.findByIdAndUpdate(id, 
    {$set: updates}, 
    {new: true}, 
    function(err, restaurant) {
      if (err) next(err);
      if (!restaurant) next();
      else res.send(restaurant);
    });
});

router.delete('/:id', function(req, res, next) {
  var id = req.params.id;
  RestaurantModel.findByIdAndRemove(id, function(err, restaurant) {
    if (err) next(err);
    if (!restaurant) next();
    else res.send(restaurant);
  });
});

router.post("/", function(req, res, next) {
  var restaurant = new RestaurantModel(req.body);
  restaurant.save(function(err) {
    if (err) next(err);
    if (!restaurant) next();
    else res.send(restaurant);
  });
});

module.exports = router;
