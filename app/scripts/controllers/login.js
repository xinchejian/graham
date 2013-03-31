'use strict';
angular.module('grahamApp.controllers')
	.controller('LoginCtrl', function($scope, $http, $location) {
		$scope.errorMsg = null;
		$scope.login = function(member) {
			$http.post('/login', member).success(function(result) {
				if (result.error) {
					$scope.errorMsg = result.error;
				}else {
					$scope.errorMsg = null;
					$location.path('/application/list');
				}
			});
		};
	}).controller('LogoutCtrl', function($scope, $http, $location) {
		$scope.message = 'Logging out...';
		$http.post('/logout').success(function(result) {
			if (result.error) {
				$scope.message = result.error;
			}else {
				$scope.message = 'Success';
				$location.path('/application');
			}
		});
	});