'use strict';

angular.module('grahamApp.services')
	.factory('authHttpInterceptor', function($q, $location, auth){
		return function(promise) {
			return promise.then(function(response){
				if(response.data && response.data.error && response.data.error === 'not authenticated'){
					auth.invalidate();
					$location.path('/application');
				}else {
					return response;
				}
			}, function(response){
				return $q.reject(response);
			});
		};
	})

	.config(function($httpProvider){
		$httpProvider.responseInterceptors.push('authHttpInterceptor');
	})

	.factory('auth', function($cookies){
		return {
			isAuthenticated : function(){
				return $cookies.userid !== undefined;
			},
			currentUserId : function(){
				return $cookies.userid;
			},
			invalidate : function(){
				delete($cookies.userid);
			},
			nickname : function(){
				return $cookies.nickname;
			}
		};
	})

;
