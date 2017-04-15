var mongoose   = require('mongoose');
var eventproxy = require('eventproxy');

// var UserModel  = mongoose.model('User');
var config     = require('../config');
// var Message    = require('../proxy').Message;
var UserProxy  = require('../proxy').User;


exports.gen_session = function(user, res) {
  var auth_token = user.account + '$$$$'; // 以后可能会存储更多信息，用 $$$$ 来分隔
  var opts = {
    path: '/',
    maxAge: 1000 * 60 * 60 * 24 * 30,
    signed: true,
    httpOnly: true
  }; 
  res.cookie(config.cookie.auth_name, auth_token, opts); //cookie 有效期30天
}

exports.check_current_user = function (req, res, next) {
  var ep = new eventproxy();
  ep.fail(next); 
  res.locals.current_user = null;

  ep.all('get_user', function (user) { 
    if (!user) { return next(); } 
    req.session.user = user;
    res.locals.current_user = user; 
    // console.log("middlewares auth check_current_user　current_user")
    // console.log(JSON.stringify(res.locals.current_user));
    return next();
  });

  if (req.session && req.session.user) { 
    return ep.emit('get_user', req.session.user);
  } else { 
    var auth_token = req.signedCookies[config.cookie.auth_name];
    if (!auth_token) { return next(); } 
    var auth = auth_token.split('$$$$');
    var account = auth[0]; 
    UserProxy.getOneByAccount(account, ep.done('get_user')); 
  }
};

exports.userRequired = function (req, res, next) {
  if (!req.session || !req.session.user || !req.session.user._id) {
    return res.status(403).send('forbidden!');
  } 
  next();
};