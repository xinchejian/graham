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


	.controller('ViewMemberCtrl', function ($scope, $routeParams, $location, Member, Payment, PopupService) {

		$scope.member = Member.get({memberId: $routeParams.id});
		$scope.paymentAdd = false;

		// Generate the default date
		var now = new Date();
		var month = now.getMonth();
		if(month <= 10) month = '0' + (month + 1);
		var today = now.getFullYear() + '-' + month + '-' + now.getDate();

		// Initialise the payment details
		$scope.payment = {length: 3, fee:250, date: today};

		$scope.roledropdown = [
			{text: 'Member', click: "updateRole('Member')"},
			{text: 'Staff Member', click: "updateRole('Staff Member')" },
			{text: 'Stakeholder', click: "updateRole('Stakeholder')" },
			{text: 'Founder', click: "updateRole('Founder')" },
		];

		$scope.updateRole = function(txt) {
			$scope.member.role = txt;
			Member.updateRole($scope.member, function(){
				alert("Updating role");
			});
		};

		$scope.remove = function(){
			Member.remove({memberId: $scope.member.id});
			PopupService.close();
			$location.path('/listMember');
		};

		$scope.dropdown = [
			{text: 'Member', href: '#anotherAction'},
			{text: 'Staff Member', click: '$alert("working ngClick!")'},
			{text: 'Stakeholder', click: '$alert("working ngClick!")'},
			{text: 'Founder	', click: '$alert("working ngClick!")'}
		];

		$scope.resetPassword = function(){
			Member.resetPassword($scope.member, function(){
				PopupService.alert('Reset Password', 'New password has been sent to member\'s email address.', 'OK', null, $scope, {});
			});
		};

		$scope.addPayment = function(){
			$scope.payment.memberId = $scope.member.id;

			console.log($scope.member);
			var p = new Payment($scope.payment);

			// Pending payment restful API
			p.$save(function(u, res){
				console.log(u, res);
				$scope.hideAddPayment();
			});
		};

		$scope.showAddPayment = function(){
			$scope.paymentAdd = true;
		};

		$scope.hideAddPayment = function(){
			$scope.paymentAdd = false;
		};

	});
