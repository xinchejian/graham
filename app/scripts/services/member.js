'use strict';

angular.module('grahamApp.services.member', ['ngResource']).
	factory('Member', function($resource){
		return $resource('/member/:memberId', {memberId:'@id'});
	});