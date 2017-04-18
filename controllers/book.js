var validator      = require('validator');
var eventproxy     = require('eventproxy');
var utility        = require('utility'); 
var uuid           = require('node-uuid');

var config         = require('../config'); 
// var authMiddleWare = require('../middlewares/auth');
// var UserProxy      = require('../proxy').User; 
var BookProxy      = require('../proxy').Book;

exports.getbook = function (req, res, next) {
	// get ID from req
	var ISBN = req.params.ISBN;
	// find book by ID from BD
	BookProxy.getOneByISBN(ISBN, function(err, book){
		if(err) { return next(err); } 
		if(!book){res.render404('该书籍不存在或已被删除');}
		else{
			// TBD: get related topic 
			res.render('book/detail',{book:book});
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
		if(!book){res.render404('编辑失败 该书籍不存在或已被删除');}
		else{
			res.render('book/edit',{book:book, title:'修改书籍', post_type:'edit'});
		}
	});	 
}

exports.create = function (req, res, next) { 
	// get value from req.body
	var bookObj = {
		name 				: req.body.name.trim(),  
  	subname 		: req.body.subname.trim(),
	  originname	: req.body.originname.trim(),
	  ISBN 				: req.body.ISBN.trim(),
	  author 			: req.body.author.trim(),
	  translator	: req.body.translator.trim(),
	  publisher 	: req.body.publisher.trim(), 
	  publishdate : req.body.publishdate.trim(),
	  intro 			: req.body.intro.trim(),   
	  authorintro : req.body.authorintro.trim(),  
	  catalog 		: req.body.catalog.trim()
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
			res.render('book/edit',{ book:bookObj, title:'添加书籍', post_type:'create', error:'已存在该书!'}); 
		}
	});

}

exports.edit = function (req, res, next) { 
	// get value from req.body
	var bookObj = {
		name 				: req.body.name.trim(),  
  	subname 		: req.body.subname.trim(),
	  originname	: req.body.originname.trim(),
	  ISBN 				: req.body.ISBN.trim(),
	  author 			: req.body.author.trim(),
	  translator	: req.body.translator.trim(),
	  publisher 	: req.body.publisher.trim(), 
	  publishdate : req.body.publishdate.trim(),
	  intro 			: req.body.intro.trim(),   
	  authorintro : req.body.authorintro.trim(),  
	  catalog 		: req.body.catalog.trim()
	};
	// check if it's ok to edit 
	BookProxy.getOneByISBN(bookObj.ISBN, function(err, book){
		if (err) { return next(err);  } 
		if(!book){ // 不存在 
			res.render404('编辑失败 该书籍不存在或已被删除');	
		}else{  // 存在
			BookProxy.update(book, bookObj,function(err){
				if(err) return next(err);
				res.redirect('book/item/'+book.ISBN );  
			});   
		}
	});	  
}