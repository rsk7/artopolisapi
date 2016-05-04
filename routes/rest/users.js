var express = require('express');
var router = express.Router();

var mongoose = require("mongoose");
var UserModel = mongoose.model("User");

var restRouter = require("./_rest-routes");
module.exports = restRouter(router, UserModel);

