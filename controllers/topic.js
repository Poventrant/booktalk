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
  		topic.cnt_visit++;
  		topic.save(function(err){
  			res.render('topic/detail',{ topic : topic });   
  		}); 
  	}
  }); 
}

exports.getcreate = function (req, res, next) { 
	var type = 0; 
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
		book_ISBNs : [req.body.book_ISBNs],
		addition :req.body.addition,
		valid_time :req.body.valid_time, 
	}; 
	// create
	TopicProxy.newAndSave(topicObj, function(err,topic){
		if(err) return next(err); 
		res.redirect('/topic/item/' + topic._id);
	}); 
}

exports.update_state = function (req, res, next) { 
	var author_id = req.session.user._id;
	var topic_id = req.body.topic_id; 
	TopicProxy.getOneByID(topic_id, function(err, topic){
		if(topic.author_id != author_id){
			res.render404('你不是该贴作者,没有修改状态的权限');
		}
		console.log('before '+topic);
		if(topic.valid_time > 0){
			topic.valid_time = 0;
		} else{
			topic.valid_time = 1;
		} 
		
		topic.save(function(err){
			console.log('after ' + topic);
			console.log('topic ddl ' + topic.valid_ddl);
			if(err) return next(err);
			res.redirect('/topic/item/' + topic._id);			
		});
		// TopicProxy.update_state(topic_id,function(err){
		// 	if(err) return next(err);
		// 	res.redirect('/topic/item/' + topic._id);
		// });
	});
}