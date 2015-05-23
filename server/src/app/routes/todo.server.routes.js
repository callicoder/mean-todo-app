var todos = require('../controllers/todo.server.controller');
var authorization = require('../controllers/authorization.server.controller');
	
module.exports = function(app) {
	// get all todos
	app.get('/api/todos', authorization.requiresLogin, todos.findAll);

	// create todo and send back all todos after creation
	app.post('/api/todos', authorization.requiresLogin, todos.create);

	// delete a todo
	app.delete('/api/todos/:todo_id', authorization.requiresLogin, todos.delete);

	// edit a todo
	app.put('/api/todos/:todo_id', authorization.requiresLogin, todos.update);
};	