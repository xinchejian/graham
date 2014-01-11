'use strict';

angular.module('grahamApp.services').
	factory('Payment', function($resource){
		return $resource('/member/:memberId/list', {memberId:'@memberId'}, {
			add: {method: 'POST', url:'/member/:memberId/addPayment'},
      remove: {method: 'DELETE', url:'/member/:memberId/removePayment/:paymentId', isArray: true}
			// resetPassword: {method:'POST', params:{resetPassword:true}},
			// updatePassword: {method:'POST', params:{updatePassword:true}},
			// updateRole: {method:'POST', params:{updateRole:true}}
		});
	});

	