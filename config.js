/**
 * config
 */

var path = require('path');

var config = {
  // system
  
  // web_info 
  name: 'bbs', // 社区名字
  description: 'bbs：书籍借阅交流社区', // 社区的描述
  keywords: 'nodejs, node, express, connect, socket.io, book',
  about:"一借一还，一本书可以做两次接触的借口，而且不着痕迹。",

  //  web_info_config
  cnt_main_books  : 10,  // 主页 每页显示书籍数
  cnt_main_lists  : 20,  // 主页 每页显示帖子数
  cnt_search_books: 10,  // 搜索  
  cnt_search_lists: 20,  // 搜索  
  cnt_book_books  : 5 ,  // 书籍
  cnt_book_lists  : 10,  // 书籍 
  home_types : ['书评','书单','书籍'], 
  topic_types:['书评','书单','出借'],
}

module.exports = config;
