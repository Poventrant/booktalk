var mongoose  = require('mongoose'); 
var Schema    = mongoose.Schema;

var BaseModel = require("./base");  


var MessageSchema = new Schema({  
	// sender
  sender_id : { type: Schema.ObjectId}, 
 	// receiver
 	receiver: { type: Schema.ObjectId},
  
  type: { type: String},
  has_read : { type: Boolean, default: false}, 
  content: { type: String}, // 内容暂无

  // if it's a rely msg, then it must have its topic & reply
  topic_id: { type: Schema.ObjectId},
  reply_id: { type: Schema.ObjectId},
  
     
     
	// system
	deleted: {type: Boolean, default: false},
  create: { type: Date, default: Date.now },
  update: { type: Date, default: Date.now }
});

MessageSchema.plugin(BaseModel);

// index
// UserSchema.index({name: 1}, {unique: true});
// UserSchema.index({ISBN: 1}, {unique: true}); 
 

MessageSchema.pre('save', function(next){
  var now = new Date();
  this.update = now;
  next();
});

mongoose.model('Message', MessageSchema);