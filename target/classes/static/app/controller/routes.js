'use strict';
(function() {
	angularApp.controllers.config([ '$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            controller : 'UserController',
            templateUrl : '/app/view/user/users.html'
        }).when('/login', {
            controller : 'LoginController',
            templateUrl : '/app/view/login/login.html'
        }).when('/car', {
            controller : 'CarController',
            templateUrl : '/app/view/car/cars.html'
        }).when('/apiDoc', {
            templateUrl: 'app/view/api/api.html',
            controller: 'ApiDocController'
        }).otherwise('/');
    } ]);
})();