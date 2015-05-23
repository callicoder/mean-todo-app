var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var TodoSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	title: {
		type: String,
		trim: true,
		required: true
	},
	completed: {
		type: Boolean,
		default: false
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	} 
});

TodoSchema.path('title').validate(function(title) {
  return !!title;
}, 'Title cannot be blank');

mongoose.model('Todo', TodoSchema);	
