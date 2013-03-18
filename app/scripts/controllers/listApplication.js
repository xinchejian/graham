'use strict';

angular.module('grahamApp.controllers.listApplication', [])
  .controller('ListApplicationCtrl', function ($scope, Application) {
		$scope.page = 1;
		$scope.applications = Application.query({page: $scope.page});

		$scope.remove = function(id){
			Application.remove({applicationId: id});
			$scope.applications = Application.query({page: $scope.page});
		};
	});
