var jwt = require('jsonwebtoken');	// used to create, sign, and verify tokens
var config = require('../../config');

exports.requiresLogin = function(req, res, next){
	// check header or url parameters or post parameters for token
	var bearerHeader= req.headers['authorization'];
	
	// decode token
	if(bearerHeader) {
		var token = bearerHeader.split(" ")[1];
		// verifies secret and checks exp
		jwt.verify(token, config.jwtSecret, function(err, decoded) {
			if (err) {
        		return res.json({ success: false, message: 'Failed to authenticate token.' });    
      		} else {
      			console.log(decoded);
        		// if everything is good, save to request for use in other routes
        		req.decoded = decoded;    
        		next();
      		}
		});	
	} else {
		// if there is no token
    	// return an error
    	return res.status(403).send({ 
        	success: false, 
        	message: 'No token provided.' 
    	});
	}
};

exports.requiresAdmin = function(req, res, next) {
	// check header or url parameters or post parameters for token
	var bearerHeader= req.headers['authorization'];
	
	// decode token
	if(bearerHeader) {
		var token = bearerHeader.split(" ")[1];
		// verifies secret and checks exp
		jwt.verify(token, config.jwtSecret, function(err, decoded) {
			if (err) {
        		return res.json({ success: false, message: 'Failed to authenticate token.' });    
      		} else {
        		// Check if user is an administrator
        		if(decoded.roles.indexof('admin') == -1) {
        			return res.status(401).send({
        				success: false,
        				message: 'Not Authorized'
        			});
        		} else {	// if everything is good, save to request for use in other routes
        			req.decoded = decoded;    
        			next();
        		}
      		}
		});	
	} else {
		// if there is no token
    	// return an error
    	return res.status(403).send({ 
        	success: false, 
        	message: 'No token provided.' 
    	});
	}
};