
angular.module('todoApp.profile')
.controller('profileController', ['$scope', 'profile', function($scope, profile) {
	
	$scope.pageClass = 'page-profile';
	profile.get()
	.success(function(data) {
		$scope.profile = data;
	});


	$scope.update = function() {
		if($scope.profileForm.$invalid) {
			return;
		}

		profile.update($scope.profile)
		.success(function(data) {
			$scope.profile = data;
		});
	};

}]);