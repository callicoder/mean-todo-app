angular.module('todoApp')
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'AccessLevels', 
    function($stateProvider, $urlRouterProvider, $locationProvider, AccessLevels) {

	$locationProvider.html5Mode(true);
	
    $stateProvider
    .state('welcome', {
        abstract: true,
        data: {
            access: AccessLevels.anon,
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
            access: AccessLevels.user
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
    })
    .state('app.users', {
        url: '/users',
        views: {
            'content@': {
                templateUrl: 'src/app/user/userList.tpl.html',
                controller: 'userListController'
            }
        },
        data: {
            pageTitle: 'TodoApp Manage Users',
            access: AccessLevels.admin
        }
    })
    .state('app.users.userDetail', {
        url: '/users/userDetail',
        views: {
            'content@': {
                templateUrl: 'src/app/users/userDetail.tpl.html',
                controller: 'userDetailController'
            }
        },
        data: {
            pageTitle: 'TodoApp User Detail'
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
