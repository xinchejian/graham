'use strict';


// Declare app level module which depends on filters, and services
angular.module('grahamApp', ['grahamApp.controllers', 'grahamApp.services', 'grahamApp.directives']).
	config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/login',					{templateUrl: 'partials/login.html'});
		$routeProvider.when('/logout',					{templateUrl: 'partials/logout.html'});
		$routeProvider.when('/application',				{templateUrl: 'partials/editApplication.html'});
		$routeProvider.when('/application/thanks',		{templateUrl: 'partials/thanks.html'});
		$routeProvider.when('/application/list',		{redirectTo: '/application/list/pending'});
		$routeProvider.when('/application/list/:status',{templateUrl: 'partials/listApplication.html'});
		$routeProvider.when('/application/approve/:id',	{templateUrl: 'partials/approveApplication.html'});
		$routeProvider.when('/application/:id',			{templateUrl: 'partials/viewApplication.html'});
		$routeProvider.when('/member/list',				{templateUrl: 'partials/listMember.html'});
		$routeProvider.when('/member/:id',				{templateUrl: 'partials/viewMember.html'});
		$routeProvider.when('/account/',				{templateUrl: 'partials/viewAccount.html'});
		$routeProvider.when('/account/password',		{templateUrl: 'partials/passwordUpdate.html'});
		$routeProvider.when('/account/success',			{templateUrl: 'partials/success.html'});
		$routeProvider.otherwise({redirectTo: '/application'});
	}]);

angular.module('grahamApp.controllers', [ 'ngCookies', '$strap.directives']);
angular.module('grahamApp.services', ['ngResource', 'popup']);
angular.module('grahamApp.directives', []);

