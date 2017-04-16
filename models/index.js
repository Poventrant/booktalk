var mongoose = require('mongoose');

var config   = require('../config');
// var logger = require('../common/logger');
 

// models
require('./user');
require('./book');
require('./topic');
require('./reply'); 
require('./message');

exports.User       = mongoose.model('User');
exports.Book       = mongoose.model('Book');
exports.Topic        = mongoose.model('Topic');
exports.Reply        = mongoose.model('Reply'); 
exports.Message      = mongoose.model('Message');
