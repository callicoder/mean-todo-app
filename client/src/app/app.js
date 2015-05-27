angular.module('todoApp', ['ui.router', 
                            'ngAnimate',
                            'ngCookies', 
                            'ngStorage', 
                            'ui.bootstrap', 
                            'angular-jwt', 
                            'todoApp.todo', 
                            'todoApp.security', 
                            'todoApp.profile',
                            'todoApp.user'
                        ]
            );

angular.module('todoApp')
.constant("AccessLevels", {
    anon: "anon",
    user: "user",
    admin: "admin"
});

angular.module('todoApp')
.run(['$rootScope', '$state', 'security', 'AccessLevels', '$location', '$window', function($rootScope, $state, security, AccessLevels, $location, $window) {

    security.requestCurrentUser();

    if(security.isAuthenticated()) {
        $state.transitionTo('app.todo');
    }
    else {
        $state.transitionTo('welcome.login');
    }

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
  
        var access = toState.data.access;

        if(!security.isAuthorized(access)) {
        	event.preventDefault();
        	$state.go('welcome.login');
        } 

        if((toState.name === 'welcome.login' || toState.name === 'welcome.register') && security.isAuthenticated())  {
            event.preventDefault();
            $state.go('app.todo');
        }
    });

    $window.ga('create', 'UA-63408310-1', {
        'cookieDomain': 'none'
    });

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        $window.ga('send', 'pageview', {
            page: $location.path(),
            title: toState.data.pageTitle
        });
    });
}]);
