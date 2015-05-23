var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto');

var validateUniqueEmail = function(value, callback) {
	var User = mongoose.model('User');
	User.count({
		email: value
	}, function(err, count) {
		if(err) {
			return callback(err);
		}
		callback(!count);
	});
}

var UserSchema = new Schema({
	firstName: {
		type: String,
		trim: true,
		required: true
	},
	lastName: {
		type: String,
		trim: true,
		required: true
	},	
	displayName: {
		type: String,
		trim: true
	},
	email: {
		type: String,
		trim: true,
		required: true,
		unique: true,
		match: [/.+\@.+\..+/, 'Please fill a valid email address'],
		validate: [validateUniqueEmail, 'Email address already in use']
	},	
	username: {
		type: String,
		trim: true,
		unique: 'Username already exists',
		required: 'Please fill in a username'
	},	
	password: {
		type: String,
		select: false,
		required: 'Please enter a password',		
	},
	salt: {
		type: String,
		select: false
	},	
	roles: {
		type: [{
			type: String,
			enum: ['user', 'admin']
		}],
		default: ['user']
	},
	created: {
		type: Date,
		default: Date.now
	},
	updated: {
		type: Date
	}	
});


UserSchema.path('password').validate(function(password) {
	return password && password.length >= 6;
}, 'Password must contain at least 6 characters');
	

UserSchema.pre('save', function(next) {
	if (this.password && this.password.length >= 6) {
		this.salt = this.makeSalt();
		this.password = this.hashPassword(this.password);
	}
	next();
});

UserSchema.methods = {
	makeSalt: function() {
		return crypto.randomBytes(16).toString('base64');
	},

	hashPassword: function(password) {
		if (this.salt && password) {
			return crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64).toString('base64');
		} else {
			return password;
		}
	},

	authenticate: function(plainText) {
    	return this.hashPassword(plainText) === this.password;
  	}
};

mongoose.model('User', UserSchema);