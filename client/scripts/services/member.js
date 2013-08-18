'use strict';

// This file must match server/routes/member.js
angular.module('grahamApp.services').
	factory('Member', function($resource){
		return $resource('/member/:memberId', {memberId:'@id'}, {
			resetPassword: {method:'POST', url:'/member/:memberId/resetPassword'},
			updatePassword: {method:'POST', url:'/member/:memberId/updatePassword'},
			updateRole: {method:'POST', url:'/member/:memberId/updateRole'}
		});
	});