'use strict';

angular.module('grahamApp.services').
	factory('Payment', function($resource){
		return $resource('/member/:memberId/list', {memberId:'@memberId'}, {
			addPayment: {method: 'POST', url:'/member/:memberId/addPayment'}
			// resetPassword: {method:'POST', params:{resetPassword:true}},
			// updatePassword: {method:'POST', params:{updatePassword:true}},
			// updateRole: {method:'POST', params:{updateRole:true}}
		});
	});

	