var express = require('express');
var router = express.Router();

var mongoose = require("mongoose");
var RestaurantModel = mongoose.model("Restaurant");

var restRouter = require("./_rest-routes");
module.exports = restRouter(router, RestaurantModel);
