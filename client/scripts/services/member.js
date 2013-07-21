'use strict';

angular.module('grahamApp.services').
	factory('Member', function($resource){
		return $resource('/member/:memberId', {memberId:'@id'}, {
			resetPassword: {method:'POST', params:{resetPassword:true}},
			updatePassword: {method:'POST', params:{updatePassword:true}},
			updateRole: {method:'POST', params:{updateRole:true}}
		});
	});