'use strict';
angular.module('grahamApp.controllers')
	.controller('LoginCtrl', function($scope, $http, $location) {
		$scope.errorMsg = null;
		$scope.login = function(member) {
			$http.post('/login', member).success(function(result) {
				$scope.errorMsg = null;
				$location.path('/signup/list');
			}).error(function(result) {
				$scope.errorMsg = result.error;
			});
		};
	})

	.controller('LogoutCtrl', function($scope, $http, $location) {
		$scope.message = 'Logging out...';
		$http.post('/logout').success(function(result) {
			$scope.message = 'Success';
			$location.path('/signup');
		}).error(function(error) {
			$scope.message = error.error;
		});
	});