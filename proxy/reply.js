var eventproxy     = require('eventproxy');

var config         = require('../config'); 

var models= require('../models');
var Reply = models.Reply;
 
var UserProxy = require('../proxy').User;

// creat a reply
exports.newAndSave = function ( ) {  
   
}

exports.getSomeByTopicID = function(topic_id, callback){ 
	var map = { deleted : false, topic_id : topic_id };
  var field = {}; 
	var ops = { 
		sort	: '-create'
	};
	Reply.find(map, field ,ops, function(err, replies){
		if(replies){
			var ep = new eventproxy();
			ep.fail(callback);
			ep.after('reply',replies.length,function(new_replies){
				console.log("proxy reply getSome:" + JSON.stringify(new_replies));
				callback(new_replies);
			});
			replies.forEach(function(reply){  // include author
		   	UserProxy.getOneByID(reply.author_id, function(err, user){
		   		reply.author = user;
		   		ep.emit('reply',reply);
		   	})			
			}); 			
		}else{
			callback(null);
		}
		
	});  
}

exports.getOneByID = function (id, callback) {  
   Reply.findOne({_id:id},function(reply){ // include author
   	UserProxy.getOneByID(reply.author_id, function(user){
   		reply.author = user;
   		callback(reply);
   	})
   });
}

// for user home page
exports.getSomeByAuthor = function ( ) {  
   
}
 