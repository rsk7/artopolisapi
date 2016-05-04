// this is following a tutorial
// we don't actually need this for the API
var FacebookStrategy = require("passport-facebook").Strategy;

var mongoose = require("mongoose");
var User = mongoose.model("User");

// facebook creds
var configAuth = require("../.creds/auth");

module.exports = function(passport) {
  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(new FacebookStrategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL,
    profileFields: ["id", "emails", "name"]
  }, function(token, refreshToken, profile, done) {
    process.nextTick(function() {
      User.findOne({"facebook.id": profile.id}, function(err, user) {
        if (err) return done(err);
        if (user) return done(null, user);
        // create new user
        var newUser = new User();
        newUser.facebook.id = profile.id;
        newUser.facebook.token = token;
        newUser.facebook.name = profile.name.givenName + " " + profile.name.familyName;
        newUser.email = profile.emails[0].value;
        newUser.facebook.gender = profile.gender;
        newUser.facebook.age = profile.age;
        newUser.save(function(err) {
          if (err) throw err;
          return done(null, newUser);
        });
      });
    });
  }));
}

