'use strict';

angular.module('grahamApp.controllers.viewMember', [])
  .controller('ViewMemberCtrl', function ($scope, $routeParams, $location, Member, PopupService) {
		$scope.member = Member.get({memberId: $routeParams.id});
		$scope.remove = function(id){
			Member.remove({memberId: id});
			PopupService.close();
			$location.path('/listMember');
		};
	});
