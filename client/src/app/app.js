angular.module('todoApp', ['ui.router', 
                            'ngAnimate',
                            'ngCookies', 
                            'ngStorage', 
                            'ui.bootstrap', 
                            'angular-jwt', 
                            'todoApp.todo', 
                            'todoApp.security', 
                            'todoApp.profile'
                        ]
            );

angular.module('todoApp')
.run(['$rootScope', '$state', 'security', function($rootScope, $state, security) {

    security.requestCurrentUser();

    if(security.isAuthenticated()) {
        $state.transitionTo('app.todo');
    }
    else {
        $state.transitionTo('welcome.login');
    }

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
  
        var requireLogin = toState.data.requireLogin;

        if(requireLogin && !security.isAuthenticated()) {
        	event.preventDefault();
        	$state.go('welcome.login');
        } 

        if((toState.name === 'welcome.login' || toState.name === 'welcome.register') && security.isAuthenticated())  {
            event.preventDefault();
            $state.go('app.todo');
        }
    });

}]);
