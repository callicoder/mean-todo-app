angular.module('todoApp.security')
.factory('security', ['$http', '$cookieStore', '$localStorage', 'jwtHelper', 'AccessLevels', 
	function($http, $cookieStore, $localStorage, jwtHelper, AccessLevels) {

	function getUserFromToken(token) {
		var tokenPayload = jwtHelper.decodeToken(token);
		return tokenPayload;
	}

	var service = {

		currentUser: null,

		login: function(user) {
			return $http.post('/api/users/authenticate', user)
			.success(function(data) {
				if(data.success) {
					service.setCurrentUser(data.token);
				}
			});
		},

		register: function(user) {
			return $http.post('/api/users', user);
		},

		logout: function() {
			delete $localStorage.access_token;
			service.currentUser = null;
		},

		isAuthorized: function(access) {
			if(access == AccessLevels.anon) {
				return true;
			} else {
				return service.isAuthenticated() && (service.currentUser.roles.indexOf('admin') != -1 || service.currentUser.roles.indexOf(access) != -1);
			}
		},

		isAuthenticated: function() {
			return !!service.currentUser;
		},

		setCurrentUser: function(token) {
			$localStorage.access_token = token;		
			service.currentUser = getUserFromToken($localStorage.access_token);
		},

		requestCurrentUser: function() {
			if($localStorage.access_token) {
				service.currentUser = getUserFromToken($localStorage.access_token);
			} else {
				service.currentUser = null;
			}
		}
	};

	return service;
}]);