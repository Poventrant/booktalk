var mongoose  = require('mongoose'); 
var Schema    = mongoose.Schema;

var BaseModel = require("./base"); 
var tools = require('../common/tools');


var TopicSchema = new Schema({  
 	author_id: { type: Schema.ObjectId},
  type : { type: Number, default: 0 },  // 帖子类型
  title: { type: String},
  content: { type: String},  
  book_ISBNs : [{ type: String}],// 书籍的ISBN号,书评或借书只有1个,书单有多个 
  // 借书类型所需  
  addition : { type: String}, // 出借者的额外补充 
  valid_time : { type: Number, default: 7 },  // 帖子有效天数,默认为1周 

  // 帖子信息 
  good 					: { type: Boolean, default: false}, // 精华
	top 					: { type: Boolean, default: false}, // 置顶
 	cnt_visit			: { type: Number, default: 0 }, 	// 访问量
 	cnt_reply			: { type: Number, default: 0 }, // 回复量  
	score 				: { type: Number, default: 0 }, // 评分
 	last_reply_id	: { type: Schema.ObjectId},
 	// lastReply_time: { type: Date, default: Date.now },  
  
	// system
	deleted: {type: Boolean, default: false},
  create: { type: Date, default: Date.now },
  update: { type: Date, default: Date.now }
});

TopicSchema.plugin(BaseModel);

// index
// UserSchema.index({name: 1}, {unique: true});
// UserSchema.index({ISBN: 1}, {unique: true}); 

  // 用tools里的moment生成以下两个,不存入数据库 
TopicSchema.virtual('valid_ddl').get(function () {
  console.log('******* M topic '); 
  return tools.Date.valid_ddl(this.create,this.valid_time);
});
TopicSchema.virtual('isValid').get(function () { 
  return tools.Date.isValid(this.create,this.valid_time);
});

TopicSchema.pre('save', function(next){
  var now = new Date();
  this.update = now;
  next();
});

mongoose.model('Topic', TopicSchema);