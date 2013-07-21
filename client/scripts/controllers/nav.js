'use strict';
angular.module('grahamApp.controllers')
	.controller('NavCtrl', function($scope, $location, auth) {
		$scope.$location = $location;
		$scope.auth = auth;
	});