var bcrypt = require('bcryptjs');
var moment = require('moment');

moment.locale('zh-cn'); // 使用中文

// 格式化时间
exports.formatDate = function (date, friendly) {

};

exports.Date = {
	formatDate : function(date, friendly){
	  date = moment(date); 
	  if (friendly) {
	    return date.fromNow();
	  } else {
	    return date.format('YYYY-MM-DD HH:mm');
	  }		
	}, 
	valid_ddl : function(date, day){
		date = moment(date);
		return date.add(day,'days').format('YYYY-MM-DD');
	},
	isValid : function(date, day){
		var today = moment();
		var ddl = moment(date).add(day,'days');
		return (!today.isAfter(ddl,'day'));
	}
}

exports.validateId = function (str) {
  return (/^[a-zA-Z0-9\-_]+$/i).test(str);
};


exports.bhash = function (str, callback) { 
  bcrypt.hash(str, 10, callback); 
};

exports.bcompare = function (str, hash, callback) {
  bcrypt.compare(str, hash, callback);
};
