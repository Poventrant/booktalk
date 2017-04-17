var utility = require('utility');
var uuid    = require('node-uuid');
var eventproxy = require('eventproxy');

var tools		= require('../common/tools');
var models  = require('../models');
var User    = models.User;

exports.newAndSave = function (account, name, password, callback) {
	tools.bhash(password, function (err, passhash) {  
	  var user = new User({name : name, account : account, password: passhash }); 
	  user.save(callback); 
	});
}

exports.getOneByAccount = function(account, callback){ 
	User.findOne({account:account},callback);
}
exports.getOneByName = function(name, callback){
	User.findOne({name:name},callback);
}

exports.getOneByID = function(id, callback){
	User.findOne({_id:id},callback);
}

exports.checkAccount = function(account, password, callback){
	User.findOne({account:account},function(err, user){
		tools.bcompare(password, user.password,function(err,bool){
			if(!bool) user=null;
			callback(err, user);
		})
	}); 
}  

exports.updatePassword = function(account, oldpass, newpass, callback){ 
	User.findOne({account:account},function(err, user){  
		tools.bcompare(oldpass, user.password, function(err,bool){
			if(!bool){
				user = null;
				callback(err, user);
			}else{
				tools.bhash(newpass, function (err, passhash) {  
				  user.password = passhash;
				  user.update = new Date();
				  user.save(callback); 
				}); 				
			}
			
		})
	});  
}

exports.updateInfo = function(account, wechat, QQ, email, address, signature, callback ){  
  User.findOneAndUpdate(
  	{ account:account },
  	{ $set:{ 
  			'wechat' : wechat,
  			'QQ' : QQ,
  			'email' : email,
  			'address' : address,
  			'signature' : signature,
  			'update' : new Date()
  		} 
  	},
  	{new:true},
  	callback 
  ); 
}