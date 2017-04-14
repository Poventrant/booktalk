var express = require('express');
var config  = require('../config');
var router = express.Router();
 
// require controllers
var sign = require('../controllers/sign');


/**
 * 假数据 begin
 */
var page = 1;
var limit = 20;
var tops = true;
var tab = 'all';
var pages = 7;

var book1 = {
    "_id" :  "58d788358345b8cc2cfa438f" , 

    "name" : "C程序设计语言",
    "subtitle":"第 2 版·新版",
    "author" :  ["（美）Brian W. Kernighan", "（美）Dennis M. Ritchie"],
    "publisher": "机械工业出版社",
    "pubdate":"2004-1",

    "content" : "？\r\n",
    "summary" : '在计算机发展的历史上，没有哪一种程序设计语言像C语言这样应用广泛。本书原著即为C语言的设计者之一Dennis M.Ritchie和著名计算机科学家Brian W.Kernighan合著的一本介绍C语言的权威经典著作。我们现在见到的大量论述C语言程序设计的教材和专著均以此书为蓝本。原著第1版中介绍的C语言成为后来广泛使用的C语言版本——标准C的基础。人们熟知的“hello,World"程序就是由本书首次引入的，现在，这一程序已经成为众多程序设计语言入门的第一课。↵原著第2版根据1987年制定的ANSIC标准做了适当的修订．引入了最新的语言形式，并增加了新的示例，通过简洁的描述、典型的示例，作者全面、系统、准确地讲述了C语言的各个特性以及程序设计的基本方法。对于计算机从业人员来说，《C程序设计语言》是一本必读的程序设计语 言方面的参考书。'
    ,

    "deleted" : false, 

    "update_at" :  "2017-03-26T09:21:57.886Z" ,
    "create_at" :  "2017-03-26T09:21:57.886Z" ,   
}

var book2 = {
    "_id" :  "58d788358345b8cc2cfa438f" ,

    "name" : "射雕英雄传",
    "author" :  ["金庸"],  
 
    "subtitle":"第 2 版·新版", 
    "publisher": "机械工业出版社",
    "pubdate":"2004-1",

    "content" : "？\r\n",
    "summary" : '在计算机发展的历史上，没有哪一种程序设计语言像C语言这样应用广泛。本书原著即为C语言的设计者之一Dennis M.Ritchie和著名计算机科学家Brian W.Kernighan合著的一本介绍C语言的权威经典著作。我们现在见到的大量论述C语言程序设计的教材和专著均以此书为蓝本。原著第1版中介绍的C语言成为后来广泛使用的C语言版本——标准C的基础。人们熟知的“hello,World"程序就是由本书首次引入的，现在，这一程序已经成为众多程序设计语言入门的第一课。↵原著第2版根据1987年制定的ANSIC标准做了适当的修订．引入了最新的语言形式，并增加了新的示例，通过简洁的描述、典型的示例，作者全面、系统、准确地讲述了C语言的各个特性以及程序设计的基本方法。对于计算机从业人员来说，《C程序设计语言》是一本必读的程序设计语 言方面的参考书。'
    ,

    "deleted" : false, 

    "update_at" :  "2017-03-26T09:21:57.886Z" ,
    "create_at" :  "2017-03-26T09:21:57.886Z" ,   
}
var books = [book1,book2];

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
var user2 = {
  "_id" : "58d775728345b8cc2cfa438d" , 

  "account" : "beibei",
  "name" : "ted",
  "wechat" : "hazard",
  "QQ" : "190749215",
  "email" : "190749215@qq.com",
  "address" : "东校区至善园4号525",
  "signature" : "不努力就去死",
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
var author = user1;

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



var message1 = {
  "_id" :  "58ecc815b896c05041923995" ,
  // 帖子 
  "topic_id" :  "58ecc739b896c05041923991" ,  
  "topic_author_id" :  "58d775728345b8cc2cfa438d" ,

  // 帖子的回复 
  "reply_id" :  "58ecc815b896c05041923994" ,  
  "reply_author_id" :  "58ecc7fd7b2656eff61685e9" ,

  "type" : "reply",
  "has_read" : true,

  "create_at" :  "2017-04-11T12:12:05.988Z" , 

  "reply" : reply,
  "topic" : topic,
  "reply_author": user2,
}
var message2 = {
  "_id" :  "58ecc815b896c05041923996" ,
  // 帖子 
  "topic_id" :  "58ecc739b896c05041923991" ,  
  "topic_author_id" :  "58d775728345b8cc2cfa438d" ,

  // 帖子的回复 
  "reply_id" :  "58ecc815b896c05041923994" ,  
  "reply_author_id" :  "58ecc7fd7b2656eff61685e9" ,

  "type" : "at",
  "has_read" : true,

  "create_at" :  "2017-04-11T12:12:05.988Z" , 

  "reply" : reply,
  "topic" : topic,
  "reply_author": user2,
}
var message3 = {
  "_id" :  "58ecc815b896c05041923996" ,
  // 帖子 
  "topic_id" :  "58ecc739b896c05041923991" ,  
  "topic_author_id" :  "58d775728345b8cc2cfa438d" ,

  // 帖子的回复 
  "reply_id" :  "58ecc815b896c05041923994" ,  
  "reply_author_id" :  "58ecc7fd7b2656eff61685e9" ,

  "type" : "reply2",
  "has_read" : true,

  "create_at" :  "2017-04-11T12:12:05.988Z" , 

  "reply" : reply,
  "topic" : topic,
  "reply_author": user2,
}
var message4 = {
  "_id" :  "58ecc815b896c05041923996" ,
  // 帖子 
  "topic_id" :  "58ecc739b896c05041923991" ,  
  "topic_author_id" :  "58d775728345b8cc2cfa438d" ,

  // 帖子的回复 
  "reply_id" :  "58ecc815b896c05041923994" ,  
  "reply_author_id" :  "58ecc7fd7b2656eff61685e9" ,

  "type" : "follow",
  "has_read" : true,

  "create_at" :  "2017-04-11T12:12:05.988Z" , 

  "reply" : reply,
  "topic" : topic,
  "reply_author": user2,
} 
var messages_unread = [message1,message2];
var messages_readed = [message3,message4];

var topics = [topic,topic];
/**
 * 假数据 end
 */
/**
 * 假数据 begin
 */
var current_user = null;

current_user = user1;
/**
 * 假数据 end
 */

// 帖子

// 查看 帖子
router.get('/topic/detail', function(req, res, next) {
  res.render('topic/detail', { 
      config: config,
      topic: topic, 
      current_user: current_user 
  });
});

// 发表/编辑 帖子
router.get('/topic/create', function(req, res, next) {
  res.render('topic/edit', { 
    config: config, 
    current_user: current_user
  });
});

// 书籍
router.get('/book/detail', function(req, res, next) {
  res.render('book/detail', { 
    config: config,
    book : book1,
    topics: topics,
    current_user: current_user
  });
});
router.get('/book/create', function(req, res, next) {
  res.render('book/edit', { 
    config: config,
    book : book1,
    topics: topics,
    current_user: current_user
  });
});

// 主页
router.get('/', function(req, res, next) {
  res.render('index', { 
  	config: config,
	  topics: topics,
	  current_page: page, 
	  tops: tops, 
	  pages: pages, 
    books:books,
	  current_user: current_user
  });
});

 
// sign 
router.get('/signin', sign.getsignin); 
router.get('/signup', sign.getsignup);
router.post('/signin',sign.signin);
router.post('/signup',sign.signup);


// user
router.get('/setting', function(req, res, next) {
  res.render('user/setting', { 
    config: config, 
    current_user: current_user
  });
});

router.get('/home', function(req, res, next) {
  res.render('user/home', { 
    config: config, 
    current_user: current_user,
    user: current_user
  });
});

router.get('/inform', function(req, res, next) {
  res.render('user/inform', { 
    config: config,
    topics: topics,
    current_page: page,
    list_topic_count: limit,
    tops: tops, 
    pages: pages,
    tabs: config.tabs,
    tab: tab,
    current_user: current_user,
    messages_unread : messages_unread,
    messages_readed : messages_readed,
    user: current_user
  });
});



module.exports = router;
