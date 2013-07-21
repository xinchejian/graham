'use strict';

angular.module('grahamApp.controllers')


	.controller('ListApplicationCtrl', function ($scope, $routeParams, $location, Application) {
		$scope.status = $routeParams.status;
		if(!$scope.status){$scope.status = 'pending';}
		$scope.applications = Application.query({status:$scope.status});

		$scope.remove = function(id){
			Application.remove({applicationId: id});
			$scope.applications = Application.query({page: $scope.page});
		};

		$scope.switchStatus = function(status){
			$location.path('/application/list/' + status);
		};
	})


	.controller('ViewApplicationCtrl', function ($scope, $routeParams, $location, Application, PopupService) {
		$scope.application = Application.get({applicationId: $routeParams.id});

		$scope.remove = function(id){
			
			console.log("Remove"+id);
			Application.remove({applicationId: id});
			PopupService.close();
			$location.path('/application/list');
		};
		$scope.terminate = function(id){
			console.log("terminate: "+id);
			Application.terminate({applicationId: id});
			PopupService.close();
			$location.path('/application/list');
		};
		$scope.activate = function(id){
			console.log("Activate: "+id);
			Application.activate({applicationId: id});
			PopupService.close();
			$location.path('/application/list');
		};
	})


	.controller('ApproveApplicationCtrl', function ($scope, $routeParams, $location, Application, PopupService) {
		$scope.application = Application.get({applicationId: $routeParams.id});
		$scope.remove = function(id){
			Application.remove({applicationId: id});
			PopupService.close();
			$location.path('/application/list');
		};

		$scope.approve = function(){
			Application.approve($scope.application, function(data){
				if(data.status === 'ok') {
					$location.path('/application/list');
				}else if(data.error){
					PopupService.alert('error', data.error, null, null, $scope);
				}
			});
		};
		console.log($scope.application);
	})


	.controller('EditApplicationCtrl', function ($scope, Application, $location) {
		$scope.apply = function(member){
			//console.log(member);
			var a = new Application(member);
			a.$save(function(u, res){
				console.log(u, res);
				$location.path('/application/thanks');
			});
		};
		$scope.load = function(){
			var m = Application.get({memberId: 1}, function(){
				console.log('got it', m);
			});
		};
	})
;