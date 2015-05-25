angular.module('todoApp.security')
.controller('loginController', ['$scope', '$state', 'security', '$localStorage', function($scope, $state, security, $localStorage) {

	$scope.pageClass = 'page-login';
	
	$scope.user = {};
	$scope.isSuccess = false;
	$scope.login = function() {
		if($scope.loginForm.$invalid) {
			return;
		}

		security.login($scope.user)
		.success(function(data){
			$scope.isSuccess = true;
			if(data.success) {
				$state.go('app.todo');
			}
		}).error(function(data){
			$scope.isSuccess = false;
			console.log(data);
		});
	};
}]);
