var mongoose  = require('mongoose'); 
var Schema    = mongoose.Schema;

var BaseModel = require("./base"); 


var BookSchema = new Schema({ 
  name: { type: String},
  subname: { type: String},
  originname: { type: String },
  ISBN: { type: String},
  author: { type: String },
  translator: {type: String},
  publisher: { type: String}, 
  publishdate: { type: String },
  intro: { type: String },   
  authorintro: { type: String },  
  catalog: { type: String },   

  cnt_visit: { type: Number, default: 0 }, 
  score: { type: Number, default: 0 }, 
	// system
	deleted: {type: Boolean, default: false},
  create: { type: Date, default: Date.now },
  update: { type: Date, default: Date.now }
});

BookSchema.plugin(BaseModel);


// UserSchema.index({name: 1}, {unique: true});
// UserSchema.index({ISBN: 1}, {unique: true}); 

BookSchema.pre('save', function(next){
  var now = new Date();
  this.update = now;
  next();
});

mongoose.model('Book', BookSchema);