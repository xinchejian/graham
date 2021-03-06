'use strict';


angular.module('grahamApp.controllers')


	.controller('ListMemberCtrl', function ($scope, Member) {
		$scope.page = 1;
		$scope.members = Member.query({page: $scope.page});

		$scope.remove = function(id){
			Member.remove({signupId: id});
			$scope.members = Member.query({page: $scope.page});
		};
	})


	.controller('ViewMemberCtrl', function ($scope, $routeParams, $location, Member, Payment, PopupService) {

		$scope.member = Member.get({memberId: $routeParams.id});
		$scope.paymentAdd = false;
		$scope.qrcode = false;

		

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
		$scope.memberqr = function() {

			$scope.qrcode = !$scope.qrcode;
			
		};
		$scope.updateRole = function(txt) {
			$scope.member.role = txt;
			Member.updateRole($scope.member, function(){
				PopupService.alert('Role update successful',
					"The user role has been updated to : " + $scope.member.role,
					"Okay", null, $scope);
			});
		};
		$scope.updateMember = function() {

			Member.updateMember($scope.member, function(){
				$location.path('/member/list');
			});
		};
		$scope.terminate = function(){
			Member.terminate({id: $scope.member.id}, function(data){
				PopupService.close();
				$location.path('/member/list');
			});
		};

		$scope.resurect = function(){
			$scope.member = Member.resurect($scope.member);
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


		$scope.removePayment = function(paymentid){

			var payment ={};
			payment.paymentId = paymentid;
			payment.memberId = $scope.member.id;

			$scope.member.payments = Payment.remove(payment);


		};
		$scope.addPayment = function(){

			$scope.payment.memberId = $scope.member.id;

			if (!$scope.member.payments) {
				$scope.member.payments = [];
			}
			$scope.member.payments.push(Payment.add($scope.payment));

			$scope.hideAddPayment();

		};


		$scope.showAddPayment = function(){
			$scope.paymentAdd = true;
		};

		$scope.hideAddPayment = function(){
			$scope.paymentAdd = false;
		};

	});
