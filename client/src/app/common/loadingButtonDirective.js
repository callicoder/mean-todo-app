angular.module('todoApp')
.directive('loadingButton', ['$timeout', function($timeout){
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			var started = false;
			var initialText = element.text();
	
			var start = function() {
				started = true;
				element.removeClass('success error');
				element.addClass('loading');
				$timeout(function(){
    				element.attr('disabled',true);
				}, 0);
				element.html(attrs.loadingValue + " &nbsp; <img src='src/assets/img/loading.gif'>");
			};

			element.bind('click', function(e){
				if(!started) {
					start();
				}
			});

			var done = function(success) {
				started = false;
				element.removeClass('loading');
				element.html(initialText);
				if(success) {
					element.addClass('success');
				} else {
					element.addClass('error');
				}	
			};

			scope.$watch(attrs.loadingCompleted, function(success){
				console.log(success);
				done(success);
			});
		}
	}
}]);