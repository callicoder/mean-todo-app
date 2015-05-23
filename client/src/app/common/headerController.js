angular.module('todoApp')
.controller('headerController', ['$scope', 'security', '$state', function($scope, security, $state) {
	$scope.isAuthenticated = security.isAuthenticated;

	$scope.$watch(function() {
		return security.currentUser;
	}, function(currentUser) {
		$scope.currentUser = currentUser;
	});

	$scope.logout = function() {
		security.logout();
		$state.go('welcome.login');
	};


}]);