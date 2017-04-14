// var models  = require('../models');
// var User    = models.User;
// var utility = require('utility');
// var uuid    = require('node-uuid');

exports.newAndSave = function (account, name, password, callback) {
  // var user     = new User();
  // user.name    = name;
  // user.account = account;
  // user.password= password; 

  // user.save(callback);
  // console.log("test newAndSave");
  callback();
};

exports.findUserByName = function(name, callback){
	var err = false;
	var sign = false;
	if(name == '无问东西'){
		sign = true;
	} 
	callback(err,sign);
}

exports.findUserByAccount = function(account, callback){ 
	var err = false;
	var sign = false;
	if(account == 'wuwendongxi'){
		sign = true;
	} 
	callback(err,sign);
}

exports.checkAccount = function(account, password, callback){
	var err = false;
	var sign = false;
	var user = {};
	if(account == "wuwendongxi" && password == "wuwendongxi"){
		sign = true;
	}
	callback(err,sign,user);
}


 