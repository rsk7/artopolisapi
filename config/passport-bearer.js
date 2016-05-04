var BearerStrategy = require("passport-http-bearer").Strategy;

var mongoose = require("mongoose");
var User = mongoose.model("User");

module.exports = function(passport) {
  passport.use(new BearerStrategy(
    function(token, done) {
      User.findOne({"facebook.token": token}, function(err, user) {
        if (err) return done(err);
        if (!user) return done(null, false);
        return done(null, user, {scope: "read"});
      });
    }
  ));
};