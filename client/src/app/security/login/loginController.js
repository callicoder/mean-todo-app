angular.module('todoApp.security')
.controller('loginController', ['$scope', '$state', 'security', '$localStorage', function($scope, $state, security, $localStorage) {

	$scope.pageClass = 'page-login';
	
	$scope.user = {};

	$scope.login = function() {
		if($scope.loginForm.$invalid) {
			return;
		}

		security.login($scope.user)
		.success(function(data){
			if(data.success) {
				$state.go('app.todo');
			}
		})
	};
}]);
