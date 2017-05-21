'use strict';
(function() {
	angularApp.controllers.config([ '$routeProvider', function($routeProvider) {
		$routeProvider.when('/', {
            controller : 'HomePageController',
            templateUrl : '/app/view/homePage/homePage.html'
        }).when('/item/list', {
			controller : 'ItemController',
			templateUrl : '/app/view/item/items.html'
		}).when('/login', {
			controller : 'LoginController',
			templateUrl : '/app/view/login/login.html'
		}).when('/item/display', {
			controller : 'ItemDisplayController',
			templateUrl : '/app/view/item/display.html'
		}).when('/shoppingCart', {
			controller : 'ShoppingCartController',
			templateUrl : '/app/view/shoppingCart/display.html'
		}).when('/review', {
			controller : 'ReviewController',
			templateUrl : '/app/view/item/display.html'
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
        }).when('/order/admin/list', {
            controller : 'OrderAdminController',
            templateUrl : '/app/view/order/list_orders.html'
        }).when('/about', {
            controller : 'AboutController',
            templateUrl : '/app/view/about/info.html'
        }).otherwise('/');
	} ]);
})();