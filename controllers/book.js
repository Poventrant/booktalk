var validator      = require('validator');
var eventproxy     = require('eventproxy');
var utility        = require('utility'); 
var uuid           = require('node-uuid');

var config         = require('../config');  
var UserProxy      = require('../proxy').User; 
var BookProxy      = require('../proxy').Book;
var TopicProxy     = require('../proxy').Topic;

exports.getbook = function (req, res, next) {
	// get ID from req
	var ISBN = req.params.ISBN;
	var page = parseInt(req.query.page, 10) || 1;
	var type = req.query.type || 0; 
	// find book by ID from BD
	BookProxy.getOneByISBN(ISBN, function(err, book){
		if(err) { return next(err); } 
		if(!book){return res.render404('该书籍不存在或已被删除');}
		else{
	    TopicProxy.getSomeForBook(ISBN, page, type, function( topics){ 
	      if(topics){
	        var total_page = 0;
	        if(topics){
	          total_page = Math.ceil(topics.length/config.cnt.main_lists); 
	        }    
	      }  
	      return res.render('book/detail',{
	      	book:book,
	        topics: topics,
	        current_page: page, 
	        // tops: tops, 
	        total_page: total_page,
	        home_type: type 
	      });    
	    });	 
		}
	});
} 

exports.getcreate = function (req, res, next) {  
	// console.log("controller book getcreate");
	var book = {}; 
	res.render('book/edit',{book:book, post_type:'create',title:'添加书籍'});
}

exports.getedit = function (req, res, next) {  
	// get book id from req.body
	var ISBN = req.params.ISBN;
	// find book by id  
	BookProxy.getOneByISBN(ISBN, function(err, book){
		if(err) { return next(err); } 
		if(!book){return res.render404('编辑失败 该书籍不存在或已被删除');}
		else{
			return res.render('book/edit',{book:book, title:'修改书籍', post_type:'edit'});
		}
	});	 
}

exports.create = function (req, res, next) { 
	// get value from req.body
	var tempObj = req.body;
	var bookObj = {
		name 				: tempObj.name.trim(),  
  	subname 		: tempObj.subname.trim(),
	  originname	: tempObj.originname.trim(),
	  ISBN 				: tempObj.ISBN.trim(),
	  author 			: tempObj.author.trim(),
	  translator	: tempObj.translator.trim(),
	  publisher 	: tempObj.publisher.trim(), 
	  publishdate : tempObj.publishdate.trim(),
	  intro 			: tempObj.intro.trim(),   
	  authorintro : tempObj.authorintro.trim(),  
	  catalog 		: tempObj.catalog.trim()
	};
	// console.log("controller book create " + bookObj.ISBN);
	// check if it's ok to creat 
	BookProxy.getOneByISBN(bookObj.ISBN, function(err, book){
		if (err) { return next(err);  } 
		if(!book){ // 不存在,可以创建该书 
			BookProxy.newAndSave( bookObj ,function(err, book){
		    if (err) { return next(err);  } 
		    res.redirect('book/item/'+book.ISBN ); 
			});			
		}else{  // 存在
			return res.render('book/edit',{ book:bookObj, title:'添加书籍', post_type:'create', error:'已存在该书!'}); 
		}
	});

}

exports.edit = function (req, res, next) { 
	// get value from req.body
	var tempObj = req.body;
	var bookObj = {
		name 				: tempObj.name.trim(),  
  	subname 		: tempObj.subname.trim(),
	  originname	: tempObj.originname.trim(),
	  ISBN 				: tempObj.ISBN.trim(),
	  author 			: tempObj.author.trim(),
	  translator	: tempObj.translator.trim(),
	  publisher 	: tempObj.publisher.trim(), 
	  publishdate : tempObj.publishdate.trim(),
	  intro 			: tempObj.intro.trim(),   
	  authorintro : tempObj.authorintro.trim(),  
	  catalog 		: tempObj.catalog.trim()
	};
	// check if it's ok to edit 
	BookProxy.getOneByISBN(bookObj.ISBN, function(err, book){ 
		if (err) { return next(err);  } 
		if(!book){ // 不存在 
			return res.render404('编辑失败 该书籍不存在或已被删除');	
		}else{  // 存在 
			BookProxy.update(book, bookObj,function(err){ 
				if(err) return next(err); 
				// console.log(book.ISBN);
				return res.redirect('/book/item/'+book.ISBN );  
			});   
		}
	});	  
}