'use strict';


// Declare app level module which depends on filters, and services
angular.module('grahamApp', ['grahamApp.controllers', 'grahamApp.services']).
	config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/application', {templateUrl: 'partials/editApplication.html'});
		$routeProvider.when('/listApplication', {templateUrl: 'partials/listApplication.html'});
		$routeProvider.when('/application/approve/:id', {templateUrl: 'partials/approveApplication.html'});
		$routeProvider.when('/application/:id', {templateUrl: 'partials/viewApplication.html'});
		$routeProvider.otherwise({redirectTo: '/application'});
	}]);
