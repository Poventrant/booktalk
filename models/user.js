var mongoose  = require('mongoose'); 
var Schema    = mongoose.Schema;

var BaseModel = require("./base"); 


var UserSchema = new Schema({
  account: { type: String},
  name: { type: String},
  password: { type: String },
  wechat: { type: String},
  QQ: { type: String },
  email: {type: String},
  address: { type: String },
  signature: { type: String },   
	
  cnt_topic: { type: Number, default: 0 },
  cnt_reply: { type: Number, default: 0 },
  cnt_good: { type: Number, default: 0 },
  cnt_borrows: { type: Number, default: 0 },
  cnt_lends: { type: Number, default: 0 }, 
  score: { type: Number, default: 0 }, 
	// system
  create: { type: Date, default: Date.now },
  update: { type: Date, default: Date.now }
});

UserSchema.plugin(BaseModel);


// UserSchema.index({account: 1}, {unique: true});
// UserSchema.index({email: 1}, {unique: true});
// UserSchema.index({score: -1}); 

UserSchema.pre('save', function(next){
  var now = new Date();
  this.update = now;
  next();
});

mongoose.model('User', UserSchema);
