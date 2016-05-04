var express = require("express");
var router = express.Router();

var mongoose = require("mongoose");
var MenuModel = mongoose.model("Menu");

var restRouter = require("./_rest-routes");
module.exports = restRouter(router, MenuModel);

