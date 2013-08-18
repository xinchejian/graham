'use strict';

// This file must match server/routes/application.js
angular.module('grahamApp.services').
	factory('Application', function($resource){
		return $resource('/application/:applicationId', {applicationId:'@id'}, {
			approve: {method:'POST', url:'/applicatioxn/:applicationId/approve'},
			terminate: {method:'POST', url:'/application/:applicationId/terminate'},
			remove: {method:'DELETE'},
			activate: {method:'POST', url:'/application/:applicationId/activate'},
		});
	});
