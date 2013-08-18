'use strict';

angular.module('grahamApp.services').
	factory('Application', function($resource){
		return $resource('/application/:applicationId', {applicationId:'@id'}, {
			approve: {method:'PUT', params:{approve:true}},
			terminate: {method:'PUT', params:{terminate:true}},
			remove: {method:'PUT', params:{remove:true}},
			activate: {method:'PUT', params:{activate:true}},
		});
	});