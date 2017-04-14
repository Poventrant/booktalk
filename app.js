// require from module
var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
var Loader = require('loader');
var _ = require('lodash');

var config = require('./config');

// require router
var indexRouter = require('./routes/index');
var users = require('./routes/users');
// require middlewares
var auth = require('./middlewares/auth');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// connect to db 
// mongoose.connect(
//   config.web.db, 
//   {server: {poolSize: 20} },   
//   function (err) {
//     if (err) {
//       logger.error('connect to %s error: ', config.web.db, err.message);
//       process.exit(1);
//   }
// });

// // session 
// app.use(session({
//   secret: config.secret.session,
//   resave: false,
//   saveUninitialized: false,  
//   store: new MongoStore({ 
//     mongooseConnection: mongoose.connection
//   })
// }));

// set static, dynamic helpers
_.extend(app.locals, {
  config: config,
  Loader: Loader
  // assets: assets
});

// application 
app.use(auth.check_current_user);


// router 
app.use('/', indexRouter);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
