'use strict';
/*
 * Routing for members
 */

var application = require('../controllers/application');

// This file must match client/scripts/services/application.js
module.exports = function(app){
	//  These first are following the express-resource convention:
	app.post('/application', application.create);
	app.get('/application/:application', application.show);
	app.del('/application/:application', application.destroy);
	app.get('/application', application.index);
	// These are non-REST method invocations:
	app.post('/application:application/approve', application.approve);
	app.post('/application:application/terminate', application.terminate);
	app.post('/application:application/activate', application.activate);
}
