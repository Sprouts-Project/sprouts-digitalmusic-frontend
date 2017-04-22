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
		}).when('/item/admin', {
			controller : 'ItemAdminController',
			templateUrl : '/app/view/item/crud.html'
		}).when('/signup', {
            controller : 'SignupController',
            templateUrl : '/app/view/signup/signup.html'
        }).when('/customer/show', {
            controller : 'CustomerController',
            templateUrl : '/app/view/customer/edit_profile.html'
        }).when('/order/create', {
            controller : 'OrderController',
            templateUrl : '/app/view/order/create_order.html'
        }).otherwise('/');
	} ]);
})();