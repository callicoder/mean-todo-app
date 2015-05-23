angular.module('todoApp')
.directive('title', ['$rootScope', '$timeout', function($rootScope, $timeout) {
    return {
        link: function() {
            $rootScope.$on('$stateChangeSuccess', function(event, toState) {
                $timeout(function() {
                    $rootScope.pageTitle = (toState.data && toState.data.pageTitle) ? toState.data.pageTitle : 'TodoApp';
                });
            });    
        }
    };
}]);