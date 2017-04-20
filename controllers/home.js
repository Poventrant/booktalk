var validator  = require('validator');
var eventproxy = require('eventproxy');
var utility    = require('utility'); 
var uuid       = require('node-uuid');

var config     = require('../config'); 
// var authMiddleWare = require('../middlewares/auth');
var UserProxy  = require('../proxy').User; 
var BookProxy  = require('../proxy').Book;
var TopicProxy = require('../proxy').Topic;
var ReplyProxy = require('../proxy').Reply;  

 
exports.index = function (req, res, next) { 
	// GET: get some info from req.query  
	var page = parseInt(req.query.page, 10) || 1;
	var type = req.query.type || 0; 
	if(type != 3){ 
    TopicProxy.getSomeForHomePage(page, type, function( topics){ 
      if(topics){
        var total_page = 0;
        if(topics){
          total_page = Math.ceil(topics.length/config.cnt.main_lists); 
        }  
      } 
      return res.render('index', {  
        topics: topics,
        current_page: page, 
        // tops: tops, 
        total_page: total_page,
        home_type: type 
      });      
    });		
	}else{ 
		BookProxy.getSomeForHomePage(page,function(err, books){ 
      if(err) return next(err);
      var total_page;
      if(books) total_page = Math.ceil(books.length/config.cnt.main_books);  
		  return res.render('index', {   
		    current_page: page,  
		    total_page: total_page,
		    home_type: type, 
		    books:books 
	  	});		
		}); 		
	} 
}

 