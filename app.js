var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');

// DB
require("./config/db");
require('./config/passport')(passport); // pass passport for configuration

// routes
var routes = require('./routes/index');
var users = require('./routes/users')(passport);
var restaurants = require('./routes/restaurants');
var menus = require('./routes/menus');

var app = express();

// view engine setup
var engines = require("consolidate");
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.engine("ejs", engines.ejs);
app.engine("jade", engines.jade);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


app.use('/', routes);
app.use('/users', users);
app.use('/restaurants', restaurants);
app.use('/menus', menus);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// catch 400 requests
// err.errors set by mongoose validators
app.use(function(err, req, res, next) {
  if (err.errors) err.status = 400;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
