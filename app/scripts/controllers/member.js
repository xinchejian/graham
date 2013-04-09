'use strict';


angular.module('grahamApp.controllers')


	.controller('ListMemberCtrl', function ($scope, Member) {
		$scope.page = 1;
		$scope.members = Member.query({page: $scope.page});

		$scope.dropdown = [
			{text: 'Member', href: '#anotherAction'},
			{text: 'Staff Member', click: "$alert('working ngClick!')"},
			{text: 'Stakeholder', click: "$alert('working ngClick!')"},
			{text: 'Founder	', click: "$alert('working ngClick!')"}
		];


		$scope.remove = function(id){
			Member.remove({applicationId: id});
			$scope.members = Member.query({page: $scope.page});
		};
	})


	.controller('ViewMemberCtrl', function ($scope, $routeParams, $location, Member, PopupService) {
		$scope.member = Member.get({memberId: $routeParams.id});
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
