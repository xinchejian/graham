'use strict';


// Declare app level module which depends on filters, and services
angular.module('grahamApp', ['ngRoute', 'grahamApp.controllers', 'grahamApp.services', 'grahamApp.directives']).
	config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/login',					{templateUrl: 'partials/login.html'});
		$routeProvider.when('/logout',					{templateUrl: 'partials/logout.html'});
		$routeProvider.when('/signup',					{templateUrl: 'partials/editSignup.html'});
		$routeProvider.when('/signup/thanks',			{templateUrl: 'partials/thanks.html'});
		$routeProvider.when('/signup/list',				{redirectTo : '/signup/list/pending'});
		$routeProvider.when('/signup/list/:status',		{templateUrl: 'partials/listSignup.html'});
		$routeProvider.when('/signup/approve/:id',		{templateUrl: 'partials/approveSignup.html'});
		$routeProvider.when('/signup/:id',				{templateUrl: 'partials/viewSignup.html'});
		$routeProvider.when('/member/list',				{templateUrl: 'partials/listMember.html'});
		$routeProvider.when('/member/:id',				{templateUrl: 'partials/viewMember.html'});
		$routeProvider.when('/account/',				{templateUrl: 'partials/viewAccount.html'});
		$routeProvider.when('/account/password',		{templateUrl: 'partials/passwordUpdate.html'});
		$routeProvider.when('/account/success',			{templateUrl: 'partials/success.html'});
		$routeProvider.otherwise({redirectTo: '/signup'});
	}]);

angular.module('grahamApp.controllers', [ 'ngCookies', '$strap.directives']);
angular.module('grahamApp.services', ['ngResource', 'popup']);
angular.module('grahamApp.directives', []);

