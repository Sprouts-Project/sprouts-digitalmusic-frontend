'use strict';
(function() {
	angularApp.controllers.config([ '$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            controller : 'ItemController',
            templateUrl : '/app/view/item/items.html'
        }).when('/login', {
            controller : 'LoginController',
            templateUrl : '/app/view/login/login.html'
        }).when('/apiDoc', {
            templateUrl: 'app/view/api/api.html',
            controller: 'ApiDocController'
        }).otherwise('/');
    } ]);
})();