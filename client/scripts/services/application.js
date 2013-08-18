'use strict';

// This file must match server/routes/application.js
angular.module('grahamApp.services').
	factory('Application', function($resource){
		return $resource('/application/:applicationId', {applicationId:'@id'}, {
			approve: {method:'POST', params:{approve:true}},
			terminate: {method:'POST', params:{terminate:true}},
			remove: {method:'DELETE', params:{remove:true}},
			activate: {method:'POST', params:{activate:true}},
		});
	});