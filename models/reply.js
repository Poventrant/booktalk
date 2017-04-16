var mongoose  = require('mongoose'); 
var Schema    = mongoose.Schema;

var BaseModel = require("./base");  


var ReplySchema = new Schema({  
 	author_id: { type: Schema.ObjectId}, 
 	topic_id: { type: Schema.ObjectId}, 
  content: { type: String},    
	// system
	deleted: {type: Boolean, default: false},
  create: { type: Date, default: Date.now },
  update: { type: Date, default: Date.now }
});

ReplySchema.plugin(BaseModel);

// index
// ReplySchema.index({author_id: 1}, {unique: true});
// ReplySchema.index({topic_id: 1}, {unique: true}); 
 

ReplySchema.pre('save', function(next){
  var now = new Date();
  this.update = now;
  next();
});

mongoose.model('Reply', ReplySchema);