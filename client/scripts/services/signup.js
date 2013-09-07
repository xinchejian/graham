'use strict';

// This file must match server/routes/signup.js
angular.module('grahamApp.services').
	factory('Signup', function($resource){
		return $resource('/signup/:signupId', {signupId:'@id'}, {
			approve		: {method:'POST', url:'/signup/:signupId/approve'}, // FIXME: is the singupId still necessary? the server side is not using the signup id.
			terminate	: {method:'POST', url:'/signup/:signupId/terminate'},
			remove		: {method:'DELETE'},
			activate	: {method:'POST', url:'/signup/:signupId/activate'},
		});
	});
