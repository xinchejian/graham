'use strict';

angular.module('grahamApp.controllers.viewApplication', [])
  .controller('ViewApplicationCtrl', function ($scope, $routeParams, $location, Application, PopupService) {
		console.log($routeParams);
		$scope.application = Application.get({applicationId: $routeParams.id});
		$scope.remove = function(id){
			Application.remove({applicationId: id});
			PopupService.close();
			$location.path('/listApplication');
		};
	});
