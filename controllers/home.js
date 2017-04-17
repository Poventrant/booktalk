var validator      = require('validator');
var eventproxy     = require('eventproxy');
var utility        = require('utility'); 
var uuid           = require('node-uuid');

var config         = require('../config'); 
// var authMiddleWare = require('../middlewares/auth');
// var UserProxy      = require('../proxy').User; 
var BookProxy      = require('../proxy').Book;
var TopicProxy		 = require('../proxy').Topic;

var tops = true;
var pages = 7;
var book1 = {
    "_id" :  "58d788358345b8cc2cfa438f" , 

    "name"    : "青年斯大林",
    "subname" :"",
    "author"  :  ["（美）Brian W. Kernighan", "（美）Dennis M. Ritchie"],
    "publisher": "机械工业出版社",
    "publishdate" :"2004-1",
    "ISBN"    :"9787513910767",
    "intro"   : '*英国科斯塔图书奖、法兰西学院奖、美国《洛杉矶时报》图书奖等国际大奖获奖作品！',
    'authorintro' : '西蒙·蒙蒂菲奥里（Simon Sebag Montefiore）1965年在英国出生，知名历史学家，英国皇家文学学会研究员。',
    'catalog' :'【目录】序曲 攻袭银行',
    "deleted" : false, 
    'cnt_visit':0,
    "score":0,
    "update" :  "2017-03-26T09:21:57.886Z" ,
    "create" :  "2017-03-26T09:21:57.886Z" ,   
}
var reply_item = {
    "_id" :   "58d788358345b8cc2cfa438f"  ,

  "author_id" :  "58d775728345b8cc2cfa438d" ,
  "author"    : user1,
  "topic_id" :    "58ecc739b896c05041923991" ,
  "content" : "啥了?？\r\n",
  "deleted" : false, 

  "update_at" :  "2017-03-26T09:21:57.886Z" ,
  "create_at" :  "2017-03-26T09:21:57.886Z" , 
 
} 
var reply_item2 = {
    "_id" :   "58d788358345b8cc2cfa438f"  ,

  "author_id" :  "58d775728345b8cc2cfa438d" ,
  "author"    : user1,
  "topic_id" :    "58ecc739b896c05041923991" ,
  "content" : "没啥?？\r\n",
  "deleted" : false, 

  "update_at" :  "2017-03-26T09:21:57.886Z" ,
  "create_at" :  "2017-03-26T09:21:57.886Z" , 
 
} 
var reply = [
 reply_item,reply_item2
]; 

var book2 = {
    "_id" :  "58d788358345b8cc2cfa438f" , 

    "name"    : "老年斯小林",
    "subname" :"",
    "author"  :  ["（美）Brian W. Kernighan", "（美）Dennis M. Ritchie"],
    "publisher": "机械工业出版社",
    "publishdate" :"2004-1",
    "ISBN"    :"9787513910767" ,
    "intro"   : '*英国科斯塔图书奖、法兰西学院奖、美国《洛杉矶时报》图书奖等国际大奖获奖作品！',
    'authorintro' : '西蒙·蒙蒂菲奥里（Simon Sebag Montefiore）1965年在英国出生，知名历史学家，英国皇家文学学会研究员。',
    'catalog' :'【目录】序曲 攻袭银行',
    "deleted" : false, 
    'cnt_visit':0,
    "score":0,
    "update" :  "2017-03-26T09:21:57.886Z" ,
    "create" :  "2017-03-26T09:21:57.886Z" ,   
}
var user1 = {
  "_id" : "58d775728345b8cc2cfa438d" , 

  "account" : "wuwendongxi",
  "name" : "无问东西",
  "wechat" : "horizontal",
  "QQ" : "406419317",
  "email" : "406419317@qq.com",
  "address" : "东校区至善园4号515",
  "signature" : "完美--完蛋了你还臭美",
   // "avatar" : "http://www.gravatar.com/avatar/363c5c7c5a3ccc61003de443a83d5734?size=48", // 头像

  // 关于帖子
  "cnt_topic": 0,
  "cnt_reply": 0,
  "cnt_good" : 0, // 精华帖子数 

  "cnt_borrows" : 0, // 借入
  "cnt_lends"   : 0, // 借出

  "score": 0,   // 用户评分

  // system
  "update" : "2017-03-30T06:32:34.257Z" ,
  "create" : "2017-03-26T08:01:54.038Z"  
  
}
var books = [book1,book2];
var topic = {
  "_id" :  "58ecc739b896c05041923991" ,

  "author_id" :  "58d775728345b8cc2cfa438d" ,
  
  "type" : 1, // 类型
  "title" : "我的主题你的主题打架的主题",
  "content" : "我的内容",  

  "addition" : "我在中大东校区，其他校区的勿扰",
  "valid_time" : 5,
  "valid_ddl"  : "2017-04-11T12:08:25.929Z",
  "isValid " : true,
  "books" : books,
  
  "update_at" :  "2017-04-11T12:08:25.929Z" ,
  "create_at" :  "2017-04-11T12:08:25.929Z" ,

  // 帖子信息 
  "good" : false, // 精华
  "top" : false,  // 置顶
  
  "collect_count" : 1,  
  "cnt_visit" : 12, // 访问量
  "cnt_reply" : 5,  // 回复量
  "cnt_ups"   : 0,  // 获赞量
  "cnt_downs" : 0,  // 反对量

  "last_reply" :  "58ecc915b896c05041923999",
  "last_reply_at" :  "2017-04-11T12:16:21.520Z" ,
  "deleted" : false, 
  "reply":reply,
  'author':user1,

};
var topics = [topic,topic];
exports.index = function (req, res, next) { 
	// GET: get some info from req.query 
	var page = parseInt(req.query.page, 10) || 1;
	var type = req.query.type || 0;
	// console.log("controller home index type " + type + ' ' + req.query.type);
	if(type != 2){
	  res.render('index', {  
	    topics: topics,
	    current_page: page, 
	    tops: tops, 
	    pages: pages,
	    home_type: type, 
	    books:books 
  	});		
	}else{ 
		BookProxy.getSomeForHomePage(page,function(err, bookss){
			console.log(JSON.stringify(bookss));
			if(err) return next(err);
		  res.render('index', {  
		    topics: topics,
		    current_page: page, 
		    tops: tops, 
		    pages: pages,
		    home_type: type, 
		    books:bookss 
	  	});		
		}); 		
	}

	
	// var proxy = TopicProxy;
	// if(type == '2'){
	// 	proxy = BookProxy;
	// }	
	// proxy.getSomeForHomePage(page,function(err, items){
	// 	if(err) return next(err);
	// 	res.render('index',{items:items,home_type:type});
	// }); 
}

 