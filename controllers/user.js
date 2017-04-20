var validator      = require('validator');
var eventproxy     = require('eventproxy');
var utility        = require('utility'); 
var uuid           = require('node-uuid');

var config         = require('../config'); 
var authMiddleWare = require('../middlewares/auth');
var User           = require('../proxy').User; 
  

exports.getsignup = function (req, res, next) {  
  return res.render('sign/signup' ); 
}

exports.signup = function (req, res, next) {  
  var account 	= req.body.account;
	var name     	= req.body.name; 
  var password  = req.body.password; 
  var ep = new eventproxy();
  ep.fail(next);
  ep.on('err', function (msg) {
    // res.status(422);
    return res.render('sign/signup', {error: msg});
  });  

  ep.all('ok_account','ok_name',function(){ 
    User.newAndSave(account, name, password, function (err) {
      if (err) { return next(err);  } 
      return res.render('sign/signup',{ success: '注册成功!' }); 
    });  
  });

  User.getOneByAccount(account,function(err, user){ 
   	if(err) { return next(err); }
  	if(user){ return ep.emit('err','该账号已被注册'); } 
    ep.emit('ok_account'); 	
  }); 
  User.getOneByName(name,function(err, user){
    if(err) { return next(err); }
    if(user){ return ep.emit('err','该用户名已存在'); }  
    ep.emit('ok_name'); 
  });  
}

exports.getsignin = function (req, res, next) {  
  return res.render('sign/signin' ); 
}

exports.signin = function (req, res, next) {
  var account 	= req.body.account; 
  var password  = req.body.password; 
  var remenber  = req.body.remenber;
  var ep       = new eventproxy();

  ep.fail(next);
 
  ep.on('login_error', function (msg) {
  	// res.status(403);
    return res.render('sign/signin', { error: msg }); 
  }); 

  ep.all('check_account','user',function(check_account, user){ 
    if(remenber){
      authMiddleWare.gen_session(user, res); // 将该用户写入session 
    }else{
      req.session.user = user;
    }
    
    return res.redirect('/'); // 跳转到首页 
  });

 	User.getOneByAccount(account,function(err, user){
    if (err) { return next(err); } 
    if (!user) { return ep.emit('login_error','该账号不存在'); }
    return ep.emit('check_account',true);    
 	});
  User.checkAccount(account,password,function(err, user){
    if (err) {  return next(err); }
    if (!user) { return ep.emit('login_error','账号或密码错误'); }  
    return ep.emit('user', user);  
  });   
 
};

exports.signout = function(req, res, next) {   
  req.session.destroy(); 
  res.clearCookie(config.cookie.auth_name, { path: '/' }); 
  return res.redirect('/');
}


exports.getsetting = function(req, res, next) { 
  return res.render('user/setting' );
}

exports.setting = function(req, res, next) {
  console.log('c user setting: '+ res) ;
  var tempObj = req.body;
  var wechat = tempObj.wechat,
  	QQ = tempObj.QQ,
  	email = tempObj.email,
		address = tempObj.address,
		signature = tempObj.signature;
		account = tempObj.account;  
	User.updateInfo(account, wechat, QQ, email, address, signature, function(err, user){
		if(err) return next(err); 
    req.session.user = user;
    res.locals.current_user = user;    
		return res.render('user/setting',{success:"用户信息修改成功"});
	});
}

exports.change_password = function(req, res, next){
	var account = null;
  if (req.session && req.session.user) { 
    account = req.session.user.account;
  } else { 
    var auth_token = req.signedCookies[config.cookie.auth_name];
    if (!auth_token) { return next(); } 
    var auth = auth_token.split('$$$$');
    account = auth[0]; 
  }
  var oldpass = req.body.oldpass;
  var newpass = req.body.newpass; 

	User.updatePassword(account, oldpass, newpass, function(err, user){
		if(err) return next(err); 
		if(!user){
			return res.render('user/setting',{perror:'原密码错误'});
		}else{  
			return res.render('user/setting',{psuccess:'密码修改成功'});  
		} 
	});
}

exports.gethomepage = function(req, res, next) {
	var name = req.params.name;
	User.getOneByName(name,function(err, user){
		if (err) { return next(err); }
    if (!user) {
      return res.render404('该用户不存在');
      return;
    }else{
    	return res.render('user/home',{user:user});	
    }
	}); 
}