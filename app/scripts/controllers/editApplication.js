'use strict';

angular.module('grahamApp.controllers.editApplication', [])
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
	});
