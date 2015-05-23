angular.module('todoApp.security')
.controller('registerController', ['$scope', '$state', 'security', function($scope, $state, security) {
	$scope.pageClass = 'page-register';

	$scope.user = {};
	$scope.isSuccess = false;
	$scope.register = function() {
		if($scope.registerForm.$invalid) {
			return;
		}
		security.register($scope.user)
		.success(function(data){
			$scope.isSuccess = true;
			$state.go('welcome.login');
		}).error(function(data){
			$scope.isSuccess = false;
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
}])
.directive('ensureMatch', function() {
	return {
		restrict: 'A',
		require: 'ngModel',
		scope: {
			password: "=ensureMatch"
		},
		link: function(scope, element, attrs, ngModel) {
			ngModel.$validators.match = function(modelValue) {
				return modelValue == scope.password
			};

			scope.$watch("password", function(){
				ngModel.$validate();
			})
		}
	}
});
