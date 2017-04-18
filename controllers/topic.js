var eventproxy = require('eventproxy');

var config 		 = require('../config');

var UserProxy  = require('../proxy').User; 
var BookProxy  = require('../proxy').Book;
var TopicProxy = require('../proxy').Topic;
var ReplyProxy = require('../proxy').Reply; 

exports.gettopic = function (req, res, next) {  
  // GET: get id from req.params
  var id = req.params.id;
  // find topic and its author and replies 
  TopicProxy.getOneByID(id, function(err, topic){  // get topic 
  	if(!topic){
  		res.render404('文章不存在或者已删除');
  	} else {
  		// console.log("c topic gettopic: " + JSON.stringify(topic.author))
  		res.render('topic/detail',{ topic : topic });   
  	}
  }); 
}

exports.getcreate = function (req, res, next) { 
	var type = 0;
	// console.log("c topic getcreate " + JSON.stringify(req.query));
	if(req.query.type){
		type = parseInt(req.query.type);

	} 
	// var topic = {};
  res.render('topic/edit',{
  	post_type:'create',
  	// topic : topic,
  	topic_type : type,
  	title : '添加'
  } ); 
}

exports.create = function (req, res, next) {  
	// POST: get element from req.body	
	var topicObj = {
		author_id : req.session.user._id,
		type :req.body.type,
		title :req.body.title,
		content :req.body.content,
		books :req.body.books,
		addition :req.body.addition,
		valid_time :req.body.valid_time, 
	};
	console.log("C topic create : ")
	console.log(JSON.stringify(topicObj));
	// create
	TopicProxy.newAndSave(topicObj, function(err,topic){
		if(err) return next(err);
		console.log(JSON.stringify(topic));
		res.redirect('/topic/item/' + topic._id);
	});
}