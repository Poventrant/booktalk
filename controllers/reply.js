var ReplyProxy = require('../proxy').Reply;
var TopicProxy = require('../proxy').Topic;
var UserProxy = require('../proxy').User;

exports.create = function (req, res, next) {
	// get data from req.body
	var replyObj = {
	 	topic_id: req.body.topic_id, 
	  content: req.body.content,      
	 	author_id: req.session.user._id, 
	} 
	ReplyProxy.newAndSave(replyObj, function(err, reply){
		if(err) return next(err);
		TopicProxy.update_last_reply(replyObj.topic_id, reply, function(err){
			if(err) return next(err);
			UserProxy.update_reply(reply.author_id,function(err){ 
				if(err) return next(err);
				res.redirect('/topic/item/'+replyObj.topic_id);
			}); 
		}); 
	});
	// res.json('sucess haha');
}