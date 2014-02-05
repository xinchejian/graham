'use strict';

angular.module('grahamApp.controllers')


	.controller('ListSignupCtrl', function ($scope, $routeParams, $location, Signup) {

		$scope.status = $routeParams.status;
		if(!$scope.status){$scope.status = 'pending';}

		$scope.signups = Signup.query({status:$scope.status});



		$scope.predicate = '-submissionDate';

		$scope.remove = function(id){
			Signup.remove({signupId: id}, function(data){
				$scope.signups = Signup.query({page: $scope.page});
			});
		};

		$scope.switchStatus = function(status){
			$location.path('/signup/list/' + status);
		};
	})


	.controller('ViewSignupCtrl', function ($scope, $routeParams, $location, Signup, PopupService) {
		$scope.signup = Signup.get({signupId: $routeParams.id});

		$scope.remove = function(id){
			console.log("Remove"+id);
			Signup.remove({signupId: id}, function(data){
				PopupService.close();
				$location.path('/signup/list');
			});
		};

		$scope.activate = function(id){
			console.log("Activate: "+id);
			Signup.activate({signupId: id}, function(data){
				PopupService.close();
				$location.path('/signup/list');
			});
		};
	})


	.controller('ApproveSignupCtrl', function ($scope, $routeParams, $location, Signup, PopupService) {
		$scope.signup = Signup.get({signupId: $routeParams.id});

		$scope.remove = function(id){
			Signup.remove({signupId: id}, function(data){
				PopupService.close();
				$location.path('/signup/list');
			});
		};

		$scope.approve = function(){
			Signup.approve($scope.signup, function(data){
				$location.path('/signup/list');
			}, function(err){
				PopupService.alert('error', err.data.error, null, null, $scope);
			});
		};
		console.log($scope.signup);
	})

	.controller('EditSignupCtrl', function ($scope, Signup, $location) {
		$scope.apply = function(member){
			//console.log(member);
			var a = new Signup(member);
			a.$save(function(u, res){
				console.log(u, res);
				$location.path('/signup/thanks');
			});
		};
		$scope.load = function(){
			var m = Signup.get({memberId: 1}, function(){
				console.log('got it', m);
			});
		};
	})
;