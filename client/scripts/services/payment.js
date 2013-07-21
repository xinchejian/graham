'use strict';

angular.module('grahamApp.services').
	factory('Payment', function($resource){
		return $resource('/payment/:paymentId', {paymentId:'@id'}, {
			// resetPassword: {method:'POST', params:{resetPassword:true}},
			// updatePassword: {method:'POST', params:{updatePassword:true}},
			// updateRole: {method:'POST', params:{updateRole:true}}
		});
	});