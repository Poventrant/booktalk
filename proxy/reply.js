var eventproxy     = require('eventproxy');

var config         = require('../config'); 

var models= require('../models');
var Reply = models.Reply;
 
var UserProxy = require('../proxy').User;

// creat a reply
exports.newAndSave = function (replyObj,callback) {  
   var reply = new Reply(replyObj);
   // console.log(reply);
   reply.save(callback);
   // callback(null);
}

exports.getSomeByTopicID = function(topic_id, callback){ 
	var map = { deleted : false, topic_id : topic_id };
  var field = {}; 
	var ops = { 
		sort: {create:1}
	};
	Reply.find(map, field ,ops, function(err, replies){
		// console.log("proxy reply getSomeByTopicID:");
		// console.log('replies' + replies);
		if(replies){
			var ep = new eventproxy();
			ep.fail(callback);
			ep.after('reply',replies.length,function(new_replies){
				// console.log("proxy reply getSomeByTopicID:" + JSON.stringify(new_replies));
				callback(null,new_replies);
			});
			replies.forEach(function(reply){  // include author
		   	UserProxy.getOneByID(reply.author_id, function(err, user){
		   		reply.author = user;
		   		ep.emit('reply',reply);
		   	})			
			}); 			
		}else{
			callback(null,[]);
		}
		
	});  
}

exports.getOneByID = function (id, callback) {  
   Reply.findOne({_id:id},function(err, reply){ // include author
   	if(reply){
	   	UserProxy.getOneByID(reply.author_id, function(err, user){
	   		reply.author = user;
	   		console.log("in proxy " + reply.author);
	   		callback(reply);
	   	});
   	}else{
   		callback(null);
   	}
   });
}

// for user home page
exports.getSomeByAuthor = function ( ) {  
   
}
 