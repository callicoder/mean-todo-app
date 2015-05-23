angular.module('todoApp')
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

	$locationProvider.html5Mode(true);
	
    $stateProvider
    .state('welcome', {
        abstract: true,
        data: {
            requireLogin: false,
        }
    })
    .state('welcome.login', {
    	url: '/login',
        views: {
            'content@': {
                templateUrl: 'src/app/security/login/login.tpl.html',
                controller: 'loginController'
            }
        },
    	data: {
            pageTitle: 'TodoApp Login'
        }
    })
    .state('welcome.register', {
    	url: '/register',
        views: {
            'content@': {
                templateUrl: 'src/app/security/register/register.tpl.html',
                controller: 'registerController'
            }
        },
        data: {
            pageTitle: 'TodoApp Register'
        }
    })
    .state('app', {
        abstract: true,
        data: {
            requireLogin: true
        }
    })
    .state('app.todo', {
        url: '/todo',
        views: {
            'content@': {
                templateUrl: 'src/app/todo/todo.tpl.html',
                controller: 'todoController'
            }
        },
        data: {
            pageTitle: 'TodoApp MyTodos'
        }
    })
    .state('app.profile', {
        url: '/profile',
        views: {
            'content@': {
                templateUrl: 'src/app/profile/profile.tpl.html',
                controller: 'profileController'
            }
        },
        data: {
            pageTitle: 'TodoApp Profile'
        }
    });
}])
.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push(['$q', '$localStorage', '$injector', function($q, $localStorage, $injector) {
        return {
            'request': function(config) {
                config.headers = config.headers || {};
                if($localStorage.access_token) {
                    config.headers.Authorization = 'Bearer ' + $localStorage.access_token;
                }
                return config;
            },
            'responseError': function(response) {
                if(response.status === 401 || response.status === 403) {
                    $state = $injector.get('$state');
                    $state.go('welcome.login');
                }
                return $q.reject(response);
            }
        }
    }]);
}]);
