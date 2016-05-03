var express = require('express');
var router = express.Router();

var mongoose = require("mongoose");
var UserModel = mongoose.model("User");

/* GET users listing. */
module.exports = function(passport) {

  router.post("/", function(req, res, next) {
    var user = new UserModel(req.body);
    user.save(function(err) {
      if (err) next(err);
      else res.send(user);
    });
  });

  router.get("/", function(req, res) {
    UserModel.find({}, function(err, user) {
      if (err) next(err);
      else res.send(user);
    });
  });

  router.put("/:id", function(req, res) {
    var id = req.params.id;
    var updates = req.body;
    UserModel.findByIdAndUpdate(id, 
      {$set: updates}, 
      {new: true}, 
      function(err, user) {
        if (err) next(err);
        else if (!user) next();
        else res.send(user);
      });
  });

    // route for home page
    router.get('/index', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // route for login form
    // route for processing the login form
    // route for signup form
    // route for processing the signup form

    // route for showing the profile page
    router.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    router.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // handle the callback after facebook has authenticated the user
    router.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/users/profile',
            failureRedirect : '/users/'
        }));

    // route for logging out
    router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    return router;
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}