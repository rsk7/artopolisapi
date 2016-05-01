var express = require('express');
var router = express.Router();

var mongoose = require("mongoose");
var RestaurantModel = mongoose.model("Restaurant");

/* GET users listing. */
router.get('/', function(req, res, next) {
	var restaurant = new RestaurantModel({
		name: "New"
	});
	restaurant.save(function (err) {
		if (err) res.send("Error");
		res.send(restaurant);
	});
});

module.exports = router;
