var eventproxy = require('eventproxy');

var config = require('../config'); 

var models = require('../models');
var Topic  = models.Topic;
// var User   = models.User;

var UserProxy  = require('../proxy').User;
// var ReplyProxy = require('../proxy').Reply;
var ReplyProxy = require('./reply');

exports.newAndSave = function (topicObj, callback) {
	var topic = new Topic(topicObj);
  topic.save(callback);
}
 

exports.getOneByID = function(id, callback){  

  Topic.findOne({ _id : id}, function(err, topic){
  	// console.log(JSON.stringify(topic));
  	if(topic){
			var ep = new eventproxy();
			ep.fail(callback);
  		ep.all('user','replies',function(user,replies){
  			topic.author = user;
  			topic.replies = replies;  // whose reply including author
  			// console.log("proxy topic getOne: ");
  			// console.log(JSON.stringify(topic.author));
  			// console.log(JSON.stringify(topic.replies)); 
  			// console.log(JSON.stringify(topic));
  			callback(err, topic);
  		});
	   	UserProxy.getOneByID(topic.author_id,function(err, user){
		  	ep.emit('user',user);
	   	}); 
	   	ReplyProxy.getSomeByTopicID(topic._id, function(err, replies){
	   		ep.emit('replies',replies);
	   	});  		 
	  }else{
	  	callback(null);
	  } 

   	
  }); 
}
 
exports.getSomeForHomePage = function (page, type, callback) {   
	var map = {
		deleted : false,
		type : type
	};
  var field = {};
	var limit = config.cnt.main_topics;
	var ops = {
		skip	: (page-1) * limit,
		limit : limit,
		sort	: '-update'
	};
  Topic.find(map, field ,ops, function(err,topics){ 
  	if(topics){
  		var ep = new eventproxy();
  		ep.fail(callback);
  		ep.after('topic',topics.length,function(topics){
  			callback(topics);

  		});
	  	topics.forEach(function(topic){
		   	UserProxy.getOneByID(topic.author_id,function(err,user){
		   		// if(!err){ return callback([]) };
		   		// if(!user){ return callback(null,null)}
		   		topic.author = user;
			   	// reply may be null 
			   	if(topic.last_reply_id){ 
			   		ReplyProxy.getOneByID(topic.last_reply_id,function(reply){  // this include reply.author 
			   			topic.last_reply = reply; 
// console.log('proxy topic getSomeForHomePage: if')
// console.log(JSON.stringify('topic'+topic));
// console.log(JSON.stringify('topic author'+topic.author));
// console.log(JSON.stringify('topic last_reply'+topic.last_reply)); 
			   			ep.emit('topic',topic);
			   		});
			   	}else{
// console.log('proxy topic getSomeForHomePage: else')
// console.log(JSON.stringify('topic'+topic));
// console.log(JSON.stringify('topic author'+topic.author));
// console.log(JSON.stringify('topic last_reply '+topic.last_reply)); 
			   		topic.last_reply = null;  
			   		ep.emit('topic',topic);
			   	}
		   	}); 
	  	});
  	}else{
  		callback([]);
  	} 
  	
  });    
}

exports.getSomeForBook = function( ){
	// by time,limit order by create time
}

// for user home page
exports.getSomeByAuthor = function( ){
	// by time,limit order by create time
}