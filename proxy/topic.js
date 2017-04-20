var eventproxy = require('eventproxy');

var config = require('../config'); 

var models = require('../models');
var Topic  = models.Topic;
// var User   = models.User;

var UserProxy  = require('../proxy').User;
var BookProxy  = require('../proxy').Book;
var ReplyProxy = require('./reply');

exports.newAndSave = function (topicObj, callback) {
	var topic = new Topic(topicObj); 
  topic.save(callback);
}
 

exports.getOneByID = function(id, callback){  

  Topic.findOne({ _id : id}, function(err, topic){ 
  	if(topic){ 
			var ep = new eventproxy();
			ep.fail(callback);

  		ep.all('user','replies','books',function(user,replies,books){
  			topic.author = user;
  			topic.replies = replies;  // whose reply including author
  			topic.books = books; 
  			console.log('2nd ' +topic.isValid);
  			callback(err, topic);
  		});
  		ep.after('book',topic.book_ISBNs.length,function(books){
				// topic.books = books;
				ep.emit('books',books);
			});
	   	UserProxy.getOneByID(topic.author_id,function(err, user){
		  	ep.emit('user',user);
	   	}); 
	   	ReplyProxy.getSomeByTopicID(topic._id, function(err, replies){
	   		ep.emit('replies',replies);
	   	});
	   	topic.book_ISBNs.forEach(function(book_ISNB){
	   		BookProxy.getOneByISBN(book_ISNB,function(err, book){ 
	   			ep.emit('book',book);
	   		})
	   	})	   		 
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
		sort	: {update:-1}
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
			   		ReplyProxy.getOneByID(topic.last_reply_id, function(reply){  // this include reply.author 
			   			topic.last_reply = reply;  
			   			// console.log("topic  and it last " + topic);
			   			// console.log("its last " + reply);
			   			// console.log("its author " + reply.author);
			   			ep.emit('topic',topic);
			   		});
			   	}else{ 
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

exports.getSomeForBook = function (ISBN, page, type, callback) {   
	var map = {
		deleted : false,
		type : type,
		book_ISBNs: {"$all":[ISBN]}
	};
  var field = {};
	var limit = config.cnt.main_topics;
	var ops = {
		skip	: (page-1) * limit,
		limit : limit,
		sort	: {update:-1}
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
			   		ReplyProxy.getOneByID(topic.last_reply_id, function(reply){  // this include reply.author 
			   			topic.last_reply = reply;  
			   			// console.log("topic  and it last " + topic);
			   			// console.log("its last " + reply);
			   			// console.log("its author " + reply.author);
			   			ep.emit('topic',topic);
			   		});
			   	}else{ 
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


// for user home page
exports.getSomeByAuthor = function( ){
	// by time,limit order by create time
}

exports.update_last_reply = function(topic_id, reply, callback){
	Topic.findOne({ _id : topic_id}, function(err, topic){		
		topic.last_reply_id = reply._id; 
		topic.update = reply.create;
		topic.cnt_reply++;
		topic.save(callback);} 
	); 
}

