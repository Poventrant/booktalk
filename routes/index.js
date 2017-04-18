var express = require('express');
var config  = require('../config');
var router = express.Router();
 
var auth = require('../middlewares/auth');

var user = require('../controllers/user');
var book = require('../controllers/book');
var home = require('../controllers/home');
var topic= require('../controllers/topic');  
var reply= require('../controllers/reply');
 
// topic
router.get('/topic/item/:id' , topic.gettopic);
router.get('/topic/create'   , auth.userRequired, topic.getcreate);
router.post('/topic/create'  , auth.userRequired, topic.create);
router.post('/topic/update_state'  , auth.userRequired, topic.update_state);
// router.get('/topic/edit/:id' , auth.userRequired, topic.getedit);  
// router.post('/topic/edit'    , auth.userRequired, topic.edit);
// router.post('/topic/delete'  , auth.userRequired, topic.delete);
router.post('/reply/create'  , auth.userRequired, reply.create);
// router.post('/reply/delete'  , auth.userRequired, reply.delete);

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
