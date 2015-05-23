var users = require('../controllers/user.server.controller');
var authorization = require('../controllers/authorization.server.controller');
module.exports = function(app) {

	// Create a new user
	app.post('/api/users', users.create);

	// Authenticate a user
	app.post('/api/users/authenticate', users.authenticate);

	// Find one user
	app.get('/api/users/:userId', authorization.requiresLogin, users.findOne);

	// update an existing user
	app.put('/api/users/:userId', authorization.requiresLogin, users.update);

	// Find all users
	app.get('/api/users', authorization.requiresAdmin, users.findAll);

	// Delete a user
	app.delete('/api/users/:userId', authorization.requiresAdmin, users.delete);

	app.get('/api/check', users.check);
};