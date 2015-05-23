var mongoose = require('mongoose');	// mongoose for mongodb
require('../models/todo.server.model');
var Todo = mongoose.model('Todo');


exports.findAll = function(req, res){
		
		// use mongoose to get all todos in the database
		Todo.find({
			user: req.decoded._id
		},function(err, todos){
			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
    	    if (err) {
    	    	res.send(err);
    	    }

    	    res.json(todos); // return all todos in JSON format
		});
};


exports.create = function(req, res){

		// create a todo, information comes from AJAX request from Angular
		Todo.create({
			title: req.body.title,
			completed: false,
			user: req.decoded._id
		}, function(err, todo){
			if(err) {
				res.send(err);
			}
			// get and return all the todos after you create another
	        Todo.find({
	        	user: req.decoded._id
	        },function(err, todos) {
	            if (err) {
	            	res.send(err)
	            }

           		res.json(todos);
        	});
		});
};


exports.delete = function(req, res){

		Todo.remove({
			_id: req.params.todo_id
		}, function(err, todo){
			if(err){
				res.send(err);
			}
			// get and return all the todos after you delete one
	        Todo.find({
	        	user: req.decoded._id
	        }, function(err, todos) {
	            if (err) {
	            	res.send(err)
	            }

            	res.json(todos);
        	});		
		});
};

exports.update = function(req, res){

		Todo.update({
				_id: req.params.todo_id
			},
			{
				title: req.body.title,
				completed: req.body.completed
		}, function(err, todo) {
			if(err) {
				res.send(err);
			}
			res.send(todo);
		});
};