var validator      = require('validator');
var eventproxy     = require('eventproxy');
var utility        = require('utility'); 
var uuid           = require('node-uuid');

var config         = require('../config');
var tools          = require('../common/tools');
var authMiddleWare = require('../middlewares/auth');
var User           = require('../proxy').User; 



exports.getsignup = function (req, res, next) {  
  res.render('sign/signup' ); 
}

exports.signup = function (req, res, next) {  
  var account 	= req.body.account;
	var name     	= req.body.name; 
  var password  = req.body.password; 
  var ep = new eventproxy();
  ep.fail(next);
  ep.on('err', function (msg) {
    // res.status(422);
    res.render('sign/signup', {error: msg});
  });  

  User.findUserByAccount(account,function(err,bool){ 
   	if(err) { return next(err); }
  	if(bool){ return ep.emit('err','该账号已被注册'); } 	
	  User.findUserByName(name,function(err,bool){
	   	if(err) { return next(err); }
	  	if(bool){ return ep.emit('err','该用户名已存在'); } 	
	  	// res.render('sign/signup',{ success: '注册成功!' }); 
	    tools.bhash(password, function (err, passhash) { 
	    	// res.render('sign/signup',{ success: '注册成功!' }); 
	      User.newAndSave(account, name, passhash, function (err) {
	        if (err) {
	          return next(err);
	        } 
	        res.render('sign/signup',{ success: '注册成功!' }); 
	      }); 
	    });	  	
		});    	
  }); 
}

exports.getsignin = function (req, res, next) {  
  res.render('sign/signin' ); 
}

exports.signin = function (req, res, next) {
  var account 	= req.body.account; 
  var password  = req.body.password; 
  var ep       = new eventproxy();

  ep.fail(next);
 
  ep.on('login_error', function (msg) {   
    res.render('sign/signin', { error: msg });
  }); 

 	User.findUserByAccount(account,function(err, bool){
    if (err) { return next(err); } 
    if (!bool) { return ep.emit('login_error','该账号不存在'); }  
	  User.checkAccount(account,password,function(err, bool, user){
	    if (err) {  return next(err); }
	    if (!bool) { return ep.emit('login_error','账号或密码错误'); }
	    // 账号密码正确,做session的事情
	    // authMiddleWare.gen_session(user, res); // 将该用户写入session
	    res.redirect('/'); // 跳转到首页
	  });     		
 	});
 
};
