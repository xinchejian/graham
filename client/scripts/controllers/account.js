'use strict';

angular.module('grahamApp.controllers')


	.controller('ViewAccountCtrl', function ($scope, Member, auth) {
		$scope.member = Member.get({memberId: auth.currentUserId()});

	})


	.controller('PasswordUpdateCtrl', function ($scope, $location, Member, auth) {
		$scope.errorMsg = '';
		
		$scope.updatePassword = function(){
	
			$scope.update.id = auth.currentUserId();

			Member.updatePassword($scope.update, function(u){
				if(u.status === 'ok'){
					$location.path('/account/success');
				}else if(u.error){
					$scope.errorMsg = u.error;
				}else {
					$scope.errorMsg = 'Sorry! Failed to update password, please try again later.';
				}
			});
		};
	});
