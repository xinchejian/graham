'use strict';
/*
 * Routing for members
 */

var application = require('../controllers/application');

module.exports = function(app){
	app.post('/application', application.create);
	app.get('/application/:application', application.show);
	app.put('/application/:application', application.update);
	app.del('/application/:application', application.destroy);
	app.get('/application', application.index);
}