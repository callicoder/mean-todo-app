angular.module('todoApp.user')
.factory('user', ['$http', function($http) {
	var service = {
		getAll: function() {
			return $http.get('/api/users');
		},

		get: function(userId) {
			return $http.get('/api/users/' + userId);
		},

		delete: function(userId) {
			return $http.delete('/api/users/' + userId);
		}
	};

	return service;
}]);