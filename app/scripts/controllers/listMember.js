'use strict';

angular.module('grahamApp.controllers.listMember', [])
  .controller('ListMemberCtrl', function ($scope, Member) {
		$scope.page = 1;
		$scope.members = Member.query({page: $scope.page});

		$scope.remove = function(id){
			Member.remove({applicationId: id});
			$scope.members = Member.query({page: $scope.page});
		};
	});
