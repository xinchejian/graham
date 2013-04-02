'use strict';

angular.module('grahamApp.controllers')


	.controller('ListApplicationCtrl', function ($scope, Application) {
		$scope.status = 'pending';
		$scope.applications = Application.query({status:$scope.status});

		$scope.remove = function(id){
			Application.remove({applicationId: id});
			$scope.applications = Application.query({page: $scope.page});
		};

		$scope.switchStatus = function(status){
			if($scope.status !== status){
				$scope.status = status;
				$scope.applications = [];
				$scope.applications = Application.query({status:$scope.status});
			}
		};
	})


	.controller('ViewApplicationCtrl', function ($scope, $routeParams, $location, Application, PopupService) {
		$scope.application = Application.get({applicationId: $routeParams.id});
		$scope.remove = function(id){
			Application.remove({applicationId: id});
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