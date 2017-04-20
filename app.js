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
var usersRouter = require('./routes/users');
// require middlewares
var authMiddleware = require('./middlewares/auth');
var error_renderMiddleware = require('./middlewares/error_render');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.use(cookieParser(config.session.secret));

// connect to db 
mongoose.Promise = global.Promise;
mongoose.connect(
  config.web.db, 
  {server: {poolSize: 20} },   
  function (err) {
    if (err) {
      logger.error('connect to %s error: ', config.web.db, err.message);
      process.exit(1);
  }
});

// session 
app.use(session({
  secret: config.session.secret,
  // key: config.auth_cookie_name, //这里auth_cookie_name就是指定内容"secret"
  cookie: {maxAge: 1000 * 60* 60}, // 1 hour
  resave: true,
  saveUninitialized: false,  
  store: new MongoStore({ 
    mongooseConnection: mongoose.connection
  })
}));

// // 处理表单及文件上传的中间件
// app.use(formidable({
//   uploadDir: path.join(__dirname, 'public/img'),// 上传文件目录
//   keepExtensions: true// 保留后缀
// }));

// set static, dynamic helpers
_.extend(app.locals, {
  config: config,
  Loader: Loader
  // assets: assets
});


// application 
app.use(error_renderMiddleware.error_page);
app.use(authMiddleware.check_current_user);
 
// router 
app.use('/', indexRouter);
// app.use('/users', usersRouter);

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
  return ;
});

module.exports = app;
