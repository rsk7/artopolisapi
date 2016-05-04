var BearerStrategy = require("passport-http-bearer").Strategy;

var mongoose = require("mongoose");
var User = mongoose.model("User");

var request = require("request");
var verificationUrl = "https://graph.facebook.com/me?access_token=";

function verifyToken(token, callback) {
  request(verficationUrl + token, function(err, resp) {
    if (err) callback(error);
    else callback(null, JSON.parse(body));
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
    else done(null, createTempUser(fbUser));
  });
}

module.exports = function(passport) {
  passport.use(new BearerStrategy(
    function(token, done) {
      User.findOne({"facebook.token": token}, function(err, user) {
        if (err) return done(err);
        if (!user) return handleNewToken(token, done);
        return done(null, user, {scope: "read"});
      });
    }
  ));
};