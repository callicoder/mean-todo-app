angular.module('todoApp.profile')
.factory('profile', ['$http', 'security', function($http, security) {
	return {
		get: function() {
			return $http.get('/api/users/' + security.currentUser._id);
		},

		update: function(profileData) {
			return $http.put('/api/users/' + security.currentUser._id, profileData);
		}
	}
}]);