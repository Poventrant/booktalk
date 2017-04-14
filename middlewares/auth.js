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

exports.gen_session = function(user, res) {
  var auth_token = user._id + '$$$$'; // 以后可能会存储更多信息，用 $$$$ 来分隔
  var opts = {
    path: '/',
    maxAge: 1000 * 60 * 60 * 24 * 30,
    signed: true,
    httpOnly: true
  };
  res.cookie(config.auth_cookie_name, auth_token, opts); //cookie 有效期30天
}

exports.check_current_user = function (req, res, next) {
  // var ep = new eventproxy();
  // ep.fail(next);
// console.log("fuck u in middlewares ");
  // Ensure current_user always has defined.
  res.locals.current_user = null;
  // res.locals.current_user = user1;
  next();
  // ep.all('get_user', function (user) {
  //   if (!user) {
  //     return next();
  //   }
  //   user = res.locals.current_user = req.session.user = new UserModel(user);

  //   if (config.admins.hasOwnProperty(user.loginname)) {
  //     user.is_admin = true;
  //   }

  //   Message.getMessagesCount(user._id, ep.done(function (count) {
  //     user.messages_count = count;
  //     next();
  //   }));
  // });

  // if (req.session.user) {
  //   ep.emit('get_user', req.session.user);
  // } else {
  //   var auth_token = req.signedCookies[config.auth_cookie_name];
  //   if (!auth_token) {
  //     return next();
  //   }

  //   var auth = auth_token.split('$$$$');
  //   var user_id = auth[0];
  //   UserProxy.getUserById(user_id, ep.done('get_user'));
  // }
};