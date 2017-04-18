/**
 * config
 */

var path = require('path');

var config = {
  // system
  
  // web_info 
  name: 'BookTalk', // 社区名字
  description: 'BookTalk：书籍借阅交流社区', // 社区的描述
  keywords: 'nodejs, node, express, connect, socket.io, book',
  about:"一借一还，一本书可以做两次接触的借口，而且不着痕迹。",

  session : {
    secret: 'booktalk_secret' 
  },
  cookie : {
    auth_name : 'booktalk_auth_name'
  },
  web : {
    host: 'localhost',
    port: 3000,
    db: 'mongodb://127.0.0.1/booktalk'
  },
  redis : {
    host: '127.0.0.1',
    port: 6379,
    db: 0,
    password: '' 
  },

  //  web_info_config
  cnt : {
    main_books  : 10,  // 主页 每页显示书籍数
    main_lists  : 20,  // 主页 每页显示帖子数
    search_books: 10,  // 搜索  
    search_lists: 20,  // 搜索  
    book_books  : 5 ,  // 书籍
    book_lists  : 10,  // 书籍    
  },
  types : {
    home : ['书评','书单','借书','书籍'], 
    topic : ['书评','书单','出借'],
  }


}

module.exports = config;
