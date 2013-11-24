'use strict';

angular.module('grahamApp.controllers')


	.controller('ViewAccountCtrl', function ($scope, Member, auth) {
		$scope.member = Member.get({memberId: auth.currentUserId()});
		$scope.updateMember = function() {
			Member.updateMember($scope.member, function(u) {
				console.log(u);
			})
		}
	})

	.controller('PasswordUpdateCtrl', function ($scope, $location, Member, auth) {
		$scope.errorMsg = '';
		
		$scope.updatePassword = function(){
	
			$scope.update.id = auth.currentUserId();

			Member.updatePassword($scope.update, function(u){
				$location.path('/account/success');
			}, function(err){
				if(err.data.error){
					$scope.errorMsg = err.data.error;
				}else {
					$scope.errorMsg = 'Sorry! Failed to update password, please try again later.';
				}
			});
		};
	});
