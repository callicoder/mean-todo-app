var mongoose = require('mongoose');	// mongoose for mongodb
require('../models/user.server.model');
var User = mongoose.model('User');
var jwt = require('jsonwebtoken');	// used to create, sign, and verify tokens
var config = require('../../config');

exports.findAll = function(req, res) {

		User.find(function(err, users){
			if(err) {
				res.send(err);
			}

			res.json(users);
		});
};


exports.findOne = function(req, res){

		User.findOne({
			_id: req.params.userId
		}, function(err, user) {
			if(err) {
				res.send(err);
			}

			res.json(user);
		});
};

exports.update = function(req, res) {
		User.findByIdAndUpdate(req.params.userId, 
			{$set:{'firstName': req.body.firstName, 'lastName': req.body.lastName, 'email':req.body.email}}, 
			{ 'new': true},
			function(err, user){
				if(err) {
					res.send(err);
				}
				res.json(user);
			});
};

exports.delete = function(req, res) {

		User.remove({
			_id: req.params.userId
		},function(err, user){
				if(err) {
					res.send(err);
				}

				User.find({}, function(err, user) {
					if(err) {
						res.send(err);
					}
					res.json(user);
				});
		});
};

exports.create = function(req, res) {

	delete req.body.roles;
	var user = new User(req.body);
	user.displayName = user.firstName + ' ' + user.lastName;

	user.save(function(err){
		if(err) {
			console.log(err);
			throw err;
		}
		res.json({success: true});
	});
};


exports.authenticate = function(req, res){
	User.findOne({
		username: req.body.username
	}, '+password +salt', function(err, user) {
		if (err) {
			throw err;
		}

		if(!user) {
			res.json({ success: false, message: 'Authentication failed. User not found.'});
		} else if (user) {
			// check if password matches
			if(!user.authenticate(req.body.password)) {
				res.json({ success: false, message: 'Authentication failed. Wrong password.' });
			} else {
				// if user is found and password is right
        		// create a token
        		user.password = undefined;
        		user.salt = undefined;

        		var token = jwt.sign(user, config.jwtSecret, {
          			expiresInMinutes: 1 // expires in 24 hours
        		});

        		res.json({
        			success: true,
        			message: 'Authenticated Successfully',
        			token: token
        		});
			}
		}
	});
};

exports.check = function(req, res) {
	
	if(req.query.fieldName == 'username') {
		User.count({
			username: req.query.fieldValue
		}, function(err, count) {
			res.json({
				unique: count == 0 ? true : false
			});
		})
	} else if(req.query.fieldName == 'email') {
		User.count({
			email: req.query.fieldValue
		}, function(err, count) {
			res.json({
				unique: count == 0 ? true : false
			});
		})
	} else {
		res.status(400).send("field name not recognized");
	}
}