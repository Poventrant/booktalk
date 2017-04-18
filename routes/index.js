var express = require('express');
var config  = require('../config');
var router = express.Router();
 
var auth = require('../middlewares/auth');

var user = require('../controllers/user');
var book = require('../controllers/book');
var home = require('../controllers/home');
var topic = require('../controllers/topic');  

// /**
//  * 假数据 begin
//  */
// var page = 1;
// var limit = 20;
// var tops = true;
// var tab = 'all';
// var pages = 7;

// var book1 = {
//     "_id" :  "58d788358345b8cc2cfa438f" , 

//     "name"    : "青年斯大林",
//     "subname" :"",
//     "author"  :  ["（美）Brian W. Kernighan", "（美）Dennis M. Ritchie"],
//     "publisher": "机械工业出版社",
//     "publishdate" :"2004-1",
//     "ISBN"    :"9787513910767",
//     "intro"   : '*英国科斯塔图书奖、法兰西学院奖、美国《洛杉矶时报》图书奖等国际大奖获奖作品！',
//     'authorintro' : '西蒙·蒙蒂菲奥里（Simon Sebag Montefiore）1965年在英国出生，知名历史学家，英国皇家文学学会研究员。',
//     'catalog' :'【目录】序曲 攻袭银行',
//     "deleted" : false, 
//     'cnt_visit':0,
//     "score":0,
//     "update" :  "2017-03-26T09:21:57.886Z" ,
//     "create" :  "2017-03-26T09:21:57.886Z" ,   
// }

// var book2 = {
//     "_id" :  "58d788358345b8cc2cfa438f" , 

//     "name"    : "老年斯小林",
//     "subname" :"",
//     "author"  :  ["（美）Brian W. Kernighan", "（美）Dennis M. Ritchie"],
//     "publisher": "机械工业出版社",
//     "publishdate" :"2004-1",
//     "ISBN"    :"9787513910767" ,
//     "intro"   : '*英国科斯塔图书奖、法兰西学院奖、美国《洛杉矶时报》图书奖等国际大奖获奖作品！',
//     'authorintro' : '西蒙·蒙蒂菲奥里（Simon Sebag Montefiore）1965年在英国出生，知名历史学家，英国皇家文学学会研究员。',
//     'catalog' :'【目录】序曲 攻袭银行',
//     "deleted" : false, 
//     'cnt_visit':0,
//     "score":0,
//     "update" :  "2017-03-26T09:21:57.886Z" ,
//     "create" :  "2017-03-26T09:21:57.886Z" ,   
// }
// var books = [book1,book2];

// var user1 = {
//   "_id" : "58d775728345b8cc2cfa438d" , 

//   "account" : "wuwendongxi",
//   "name" : "无问东西",
//   "wechat" : "horizontal",
//   "QQ" : "406419317",
//   "email" : "406419317@qq.com",
//   "address" : "东校区至善园4号515",
//   "signature" : "完美--完蛋了你还臭美",
//    // "avatar" : "http://www.gravatar.com/avatar/363c5c7c5a3ccc61003de443a83d5734?size=48", // 头像

//   // 关于帖子
//   "cnt_topic": 0,
//   "cnt_reply": 0,
//   "cnt_good" : 0, // 精华帖子数 

//   "cnt_borrows" : 0, // 借入
//   "cnt_lends"   : 0, // 借出

//   "score": 0,   // 用户评分

//   // system
//   "update" : "2017-03-30T06:32:34.257Z" ,
//   "create" : "2017-03-26T08:01:54.038Z"  
  
// }
// var user2 = {
//   "_id" : "58d775728345b8cc2cfa438d" , 

//   "account" : "beibei",
//   "name" : "ted",
//   "wechat" : "hazard",
//   "QQ" : "190749215",
//   "email" : "190749215@qq.com",
//   "address" : "东校区至善园4号525",
//   "signature" : "不努力就去死",
//    // "avatar" : "http://www.gravatar.com/avatar/363c5c7c5a3ccc61003de443a83d5734?size=48", // 头像

//   // 关于帖子
//   "cnt_topic": 0,
//   "cnt_reply": 0,
//   "cnt_good" : 0, // 精华帖子数 

//   "cnt_borrows" : 0, // 借入
//   "cnt_lends"   : 0, // 借出

//   "score": 0,   // 用户评分

//   // system
//   "update" : "2017-03-30T06:32:34.257Z" ,
//   "create" : "2017-03-26T08:01:54.038Z"  
  
// }
// var author = user1;

// var reply_item = {
//     "_id" :   "58d788358345b8cc2cfa438f"  ,

//   "author_id" :  "58d775728345b8cc2cfa438d" ,
//   "author"    : user1,
//   "topic_id" :    "58ecc739b896c05041923991" ,
//   "content" : "啥了?？\r\n",
//   "deleted" : false, 

//   "update_at" :  "2017-03-26T09:21:57.886Z" ,
//   "create_at" :  "2017-03-26T09:21:57.886Z" , 
 
// } 
// var reply_item2 = {
//     "_id" :   "58d788358345b8cc2cfa438f"  ,

//   "author_id" :  "58d775728345b8cc2cfa438d" ,
//   "author"    : user1,
//   "topic_id" :    "58ecc739b896c05041923991" ,
//   "content" : "没啥?？\r\n",
//   "deleted" : false, 

//   "update_at" :  "2017-03-26T09:21:57.886Z" ,
//   "create_at" :  "2017-03-26T09:21:57.886Z" , 
 
// } 
// var reply = [
//  reply_item,reply_item2
// ]; 

// var topic = {
//   "_id" :  "58ecc739b896c05041923991" ,

//   "author_id" :  "58d775728345b8cc2cfa438d" ,
  
//   "type" : 1, // 类型
//   "title" : "我的主题你的主题打架的主题",
//   "content" : "我的内容",  

//   "addition" : "我在中大东校区，其他校区的勿扰",
//   "valid_time" : 5,
//   "valid_ddl"  : "2017-04-11T12:08:25.929Z",
//   "isValid " : true,
//   "books" : books,
  
//   "update_at" :  "2017-04-11T12:08:25.929Z" ,
//   "create_at" :  "2017-04-11T12:08:25.929Z" ,

//   // 帖子信息 
//   "good" : false, // 精华
//   "top" : false,  // 置顶
  
//   "collect_count" : 1,  
//   "cnt_visit" : 12, // 访问量
//   "cnt_reply" : 5,  // 回复量
//   "cnt_ups"   : 0,  // 获赞量
//   "cnt_downs" : 0,  // 反对量

//   "last_reply" :  "58ecc915b896c05041923999",
//   "last_reply_at" :  "2017-04-11T12:16:21.520Z" ,
//   "deleted" : false, 
//   "reply":reply,
//   'author':user1,

// };



// var message1 = {
//   "_id" :  "58ecc815b896c05041923995" ,
//   // 帖子 
//   "topic_id" :  "58ecc739b896c05041923991" ,  
//   "topic_author_id" :  "58d775728345b8cc2cfa438d" ,

//   // 帖子的回复 
//   "reply_id" :  "58ecc815b896c05041923994" ,  
//   "reply_author_id" :  "58ecc7fd7b2656eff61685e9" ,

//   "type" : "reply",
//   "has_read" : true,

//   "create_at" :  "2017-04-11T12:12:05.988Z" , 

//   "reply" : reply,
//   "topic" : topic,
//   "reply_author": user2,
// }
// var message2 = {
//   "_id" :  "58ecc815b896c05041923996" ,
//   // 帖子 
//   "topic_id" :  "58ecc739b896c05041923991" ,  
//   "topic_author_id" :  "58d775728345b8cc2cfa438d" ,

//   // 帖子的回复 
//   "reply_id" :  "58ecc815b896c05041923994" ,  
//   "reply_author_id" :  "58ecc7fd7b2656eff61685e9" ,

//   "type" : "at",
//   "has_read" : true,

//   "create_at" :  "2017-04-11T12:12:05.988Z" , 

//   "reply" : reply,
//   "topic" : topic,
//   "reply_author": user2,
// }
// var message3 = {
//   "_id" :  "58ecc815b896c05041923996" ,
//   // 帖子 
//   "topic_id" :  "58ecc739b896c05041923991" ,  
//   "topic_author_id" :  "58d775728345b8cc2cfa438d" ,

//   // 帖子的回复 
//   "reply_id" :  "58ecc815b896c05041923994" ,  
//   "reply_author_id" :  "58ecc7fd7b2656eff61685e9" ,

//   "type" : "reply2",
//   "has_read" : true,

//   "create_at" :  "2017-04-11T12:12:05.988Z" , 

//   "reply" : reply,
//   "topic" : topic,
//   "reply_author": user2,
// }
// var message4 = {
//   "_id" :  "58ecc815b896c05041923996" ,
//   // 帖子 
//   "topic_id" :  "58ecc739b896c05041923991" ,  
//   "topic_author_id" :  "58d775728345b8cc2cfa438d" ,

//   // 帖子的回复 
//   "reply_id" :  "58ecc815b896c05041923994" ,  
//   "reply_author_id" :  "58ecc7fd7b2656eff61685e9" ,

//   "type" : "follow",
//   "has_read" : true,

//   "create_at" :  "2017-04-11T12:12:05.988Z" , 

//   "reply" : reply,
//   "topic" : topic,
//   "reply_author": user2,
// } 
// var messages_unread = [message1,message2];
// var messages_readed = [message3,message4];

// var topics = [topic,topic];
// /**
//  * 假数据 end
//  */
// /**
//  * 假数据 begin
//  */
// var current_user = null;

// current_user = user1;
/**
 * 假数据 end
 */

// topic
router.get('/topic/item/:id' , topic.gettopic);
router.get('/topic/create'   , auth.userRequired, topic.getcreate);
router.post('/topic/create'  , auth.userRequired, topic.create);
// router.get('/topic/edit/:id' , auth.userRequired, topic.getedit);  
// router.post('/topic/edit'    , auth.userRequired, topic.edit);
// router.post('/topic/delete'  , auth.userRequired, topic.delete);
// router.post('/reply/create'  , auth.userRequired, reply.create);
// router.post('/reply/delete'  , auth.userRequired, reply.delete);

// router.get('/topic/detail', function(req, res, next) {
//   res.render('topic/detail', { 
//       // config: config,
//       topic: topic  
//       // current_user: current_user 
//   });
// });
 
// router.get('/topic/create', function(req, res, next) {
//   res.render('topic/edit', {
//     // config: config, 
//     // current_user: current_user
//   });
// });

// home page
router.get('/', home.index );

// book
router.get('/book/item/:ISBN', book.getbook);
router.get('/book/create'    , auth.userRequired, book.getcreate);
router.post('/book/create'   , auth.userRequired, book.create);   
router.post('/book/edit'     , auth.userRequired, book.edit);
router.get('/book/edit/:ISBN', auth.userRequired, book.getedit); 

// user
router.get('/signin'  , user.getsignin); 
router.get('/signup'  , user.getsignup);
router.post('/signin' , user.signin);
router.post('/signup' , user.signup);
router.get('/signout' , user.signout);

router.get('/setting', auth.userRequired, user.getsetting);
router.post('/setting', auth.userRequired, user.setting);
router.post('/change_password', auth.userRequired, user.change_password);
router.get('/home/:name', user.gethomepage);

// router.get('/inform', auth.userRequired, user.inform);
router.get('/inform', function(req, res, next) {
  res.render('user/inform', { 
    // config: config,
    topics: topics,
    current_page: page,
    list_topic_count: limit,
    tops: tops, 
    pages: pages,
    tabs: config.tabs,
    tab: tab,
    // current_user: current_user,
    messages_unread : messages_unread,
    messages_readed : messages_readed,
    user: current_user
  });
});



module.exports = router;
