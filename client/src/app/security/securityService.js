angular.module('todoApp.security')
.factory('security', ['$http', '$cookieStore', '$localStorage', 'jwtHelper', function($http, $cookieStore, $localStorage, jwtHelper) {

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