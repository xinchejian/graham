'use strict';


angular.module('grahamApp.controllers')


	.controller('ListMemberCtrl', function ($scope, Member) {
		$scope.page = 1;
		$scope.members = Member.query({page: $scope.page});

		$scope.remove = function(id){
			Member.remove({applicationId: id});
			$scope.members = Member.query({page: $scope.page});
		};
	})


	.controller('ViewMemberCtrl', function ($scope, $routeParams, $location, Member, PopupService) {

		$scope.member = Member.get({memberId: $routeParams.id});


		$scope.roledropdown = [
			{text: 'Member', click: "updateRole('Member')"},
			{text: 'Staff Member', click: "updateRole('Staff Member')" },
			{text: 'Stakeholder', click: "updateRole('Stakeholder')" },
			{text: 'Founder', click: "updateRole('Founder')" },
		];

		$scope.updateRole = function(txt) {
			$scope.member.role = txt;
			Member.updateRole($scope.member, function(){
				
			});
		};

		$scope.remove = function(id){
			Member.remove({memberId: id});
			PopupService.close();
			$location.path('/listMember');
		};



		$scope.resetPassword = function(){
			Member.resetPassword($scope.member, function(){
				
			});
		};
	});
