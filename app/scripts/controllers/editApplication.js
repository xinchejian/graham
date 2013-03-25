'use strict';

angular.module('grahamApp.controllers.editApplication', [])
  .controller('EditApplicationCtrl', function ($scope, Application, $location) {
		$scope.apply = function(member){
			//console.log(member);
			var a = new Application(member);
			a.$save(function(u, res){
				

					if(u.id) {
						$scope.signUp.email.alreadyused = false;
						//Application.email.alreadyused(false);
						$location.path('/application/thanks');
					} else {
						$scope.signUp.email.alreadyused = true;
						//Application.email.alreadyused(true);
						console.log("error, duplicate key.");
					}

			});
		};
		$scope.load = function(){
			var m = Application.get({memberId: 1}, function(){
				console.log('got it', m);

			});
		};
	});
