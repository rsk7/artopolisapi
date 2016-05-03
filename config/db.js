var mongoose = require("mongoose");
var mongoCreds = require("../.creds/mongo");

// connecting to mongo
// console.log("Connecting: " + mongoCreds.url);
mongoose.connect(mongoCreds.url);

mongoose.connection.on("open", function() {
  // console.log("Mongo connected");
});

mongoose.connection.on("error", function(err) {
  console.log("Connection error: " + err);
});

process.on("SIGINT", function() {
  mongoose.connection.close(function() {
    console.log("Closing mongo connection.");
    process.exit(0);
  });
});

require("../models/userSchema");
require("../models/menuSchema");
require("../models/restaurantSchema");

