'use strict';

angular.module('grahamApp.controllers.approveApplication', [])
  .controller('ApproveApplicationCtrl', function ($scope, $routeParams, $location, Application, PopupService) {


		$scope.application = Application.get({applicationId: $routeParams.id});



		$scope.remove = function(id){
			Application.remove({applicationId: id});
			PopupService.close();
			$location.path('/listApplication');
		};

		$scope.approve = function(){
			Application.approve($scope.application, function(data){
				if(data.status === 'ok') {
					$location.path('/listApplication');
				}else if(data.error){
					PopupService.alert('error', data.error, null, null, $scope);
				}
			});
		};
		//console.log($scope.application);
	});