'use strict';

angular.module('grahamApp.controllers.approveApplication', [])
  .controller('ApproveApplicationCtrl', function ($scope, $routeParams, $location, Application, PopupService) {


		$scope.application = Application.get({applicationId: $routeParams.id});
		$scope.memberships = [
			{name:'(100元) One Month', months:'1', cost:'100'},
			{name:'(250元) Three Months', months:'3', cost:'250'},
			{name:'(450元) Six Months', months:'6', cost:'450'}
		];



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