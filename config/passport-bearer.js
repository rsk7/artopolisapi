var BearerStrategy = require("passport-http-bearer").Strategy;

var mongoose = require("mongoose");
var User = mongoose.model("User");

var fbgraph = require("fbgraph");
var authConfig = require("../.creds/auth");
fbgraph.setAppSecret(authConfig.facebookAuth.clientSecret);

function verifyToken(token, callback) {
  fbgraph.setAccessToken(token);
  fbgraph.get("me", function(err, res) {
    if (err) callback(error);
    else callback(null, res);
  });
}

function createTempUser(fbUser, token) {
  return new User({
    facebook: {
      id: fbUser.id,
      name: fbUser.name,
      token: token
    }
  });
}

function handleNewToken(token, done) {
  verifyToken(token, function(err, fbUser) {
    if (err) done(err);
    // TODO: create a user with limited access, so the client can register
    else done(null, createTempUser(fbUser), { scope: "read" });
  });
}

module.exports = function(passport) {
  passport.use(new BearerStrategy(
    function(token, done) {
      // TODO: cache tokens that we've already seen
      User.findOne({"facebook.token": token}, function(err, user) {
        if (err) return done(err);
        if (!user) return handleNewToken(token, done);
        // change this scope to be more than just read
        return done(null, user, { scope: "read" });
      });
    }
  ));
};