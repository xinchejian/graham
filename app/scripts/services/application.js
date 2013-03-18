'use strict';

angular.module('grahamApp.services.application', ['ngResource']).
	factory('Application', function($resource){
		return $resource('/application/:applicationId', {applicationId:'@id'}, {
			approve: {method:'POST', params:{approve:true}}
		});
	});