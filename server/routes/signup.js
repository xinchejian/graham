'use strict';
/*
 * Routing for members
 */

var signup = require('../controllers/signup');

// This file must match client/scripts/services/signup.js
module.exports = function(app){
	//  These first are following the express-resource convention:
	app.post('/signup', signup.create);
	app.get('/signup/:id', signup.show);
	app.delete('/signup/:id', signup.destroy);
	app.get('/signup', signup.index);
	// These are non-REST method invocations:
	app.post('/signup/:id/approve', signup.approve);
	app.post('/signup/:id/activate', signup.activate);
}
