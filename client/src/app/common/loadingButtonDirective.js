angular.module('todoApp')
.directive('loadingButton', ['$timeout', function($timeout){
	return {
		restrict: 'A',
		scope: {
			completed: "=loadingCompleted"
		},
		link: function(scope, element, attrs) {
			var started = false;
			var initialText = element.text();
	
			var start = function() {
				started = true;
				element.removeClass('success error');
				element.addClass('loading');
				element.text(attrs.loadingValue);
			};

			element.bind('click', function(e){
				if(!started) {
					start();
				}
			});

			var done = function(success) {
				element.removeClass('loading');
				if(success) {
					element.addClass('success');
				} else {
					element.addClass('error');
					element.text(initialText);
				}	
			};

			scope.$watch('completed', function(success){
				done(success);
			});
		}
	}
}]);