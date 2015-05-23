angular.module('todoApp.security')
.controller('registerController', ['$scope', '$state', 'security', function($scope, $state, security) {
	$scope.pageClass = 'page-register';

	$scope.user = {};
	$scope.register = function() {
		if($scope.registerForm.$invalid) {
			return;
		}
		security.register($scope.user)
		.success(function(data){
			$state.go('welcome.login');
		}); 
	};
}])
.directive('ensureUnique', ['$http', function($http){
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, element, attrs, ngModel) {
			element.bind('blur', function(e){
				if(!ngModel || !ngModel.$modelValue) {
					return;
				}
				var currentValue = ngModel.$modelValue;
				$http.get('/api/check' + '?fieldName=' + attrs.ensureUnique + '&fieldValue=' + escape(currentValue))
				.success(function(data){
					//Ensure value that being checked hasn't changed
					//Since server call was made
					if(currentValue = ngModel.$modelValue) {
						ngModel.$setValidity('unique', data.unique);
					}
				}).error(function(data){
					ngModel.$setValidity('unique', true);
				});
			});

			element.bind('keydown', function(e) {
				ngModel.$setValidity('unique', true);
			});
		}
	}
}]);
