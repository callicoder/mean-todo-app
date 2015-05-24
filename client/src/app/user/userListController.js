angular.module('todoApp.user')
.controller('userListController', ['$scope', 'user', function($scope, user) {
	user.getAll()
	.success(function(data){
		$scope.users = data;
	}).error(function(data){	
		console.log(data);
	});

	$scope.deleteUser = function(userId) {
		user.delete(userId)
		.success(function(data){
			$scope.users = data;
		}).error(function(data){
			console.log(data);
		});
	}
}]);