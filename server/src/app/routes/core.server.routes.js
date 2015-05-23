
var path = require('path');

module.exports = function(app) {

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
	    res.sendFile(path.join(__dirname, '../../../../client/src', 'index.html')); // load the single view file (angular will handle the page changes on the front-end)
	});

}

