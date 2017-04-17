var eventproxy     = require('eventproxy');

var config	= require('../config'); 
var models  = require('../models');
var Book    = models.Book;

// creat a book
exports.newAndSave = function (bookObj, callback) {  
   var book = new Book(bookObj); 
   book.save(callback);
}

// update a book
exports.update = function (book, bookObj, callback) {  
 	book.name = bookObj.name,  
	book.subname = bookObj.subname,
  book.originname	= bookObj.originname,
  book.ISBN = bookObj.ISBN,
  book.author = bookObj.author,
  book.translator = bookObj.translator,
  book.publisher = bookObj.publisher, 
  book.publishdate = bookObj.publishdate,
  book.intro = bookObj.intro,   
  book.authorintro = bookObj.authorintro,  
  book.catalog = bookObj.catalog
	book.update = new Date();
	book.save(callback); 
}

exports.getOneByID = function (id, callback) {  
  Book.findOne({_id:id,deleted:false}, callback);
}

exports.getOneByISBN = function (ISBN, callback) {  
  Book.findOne({ISBN:ISBN,deleted:false},callback);  
}

exports.getSomeForHomePage = function (page, callback) {
	var map = {
		deleted : false
	};
  var field = {};
	var limit = config.cnt.main_books;
	var ops = {
		skip	: (page-1) * limit,
		limit : limit,
		sort	: '-update'
	};
  Book.find(map, field ,ops, callback); // callback(err, books)
}
 