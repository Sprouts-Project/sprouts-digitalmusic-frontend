'use strict';
(function() {
	var ShoppingCartController = function($scope, $http, $routeParams) {
		$scope.items = [],
		$scope.error = false;

		self.doGetItems = function() {
			$http({
				method : 'GET',
				url : '/shoppingCart/list'
			}).success(function(response) {
				$scope.items = response;
				$scope.error = false;
			}).error(function (response) {
				$scope.error = true;
			});
		}

		$scope.doAddItem = function(id) {
			$http({
				method : 'GET',
				url : '/shoppingCart/addItem',
				params : {
					itemId : id
				},
				headers : {
					'Content-type' : 'application/json;charset=utf-8'
				}
			}).success(function(response) {
				$scope.error = false;
			}).error(function(response) {
				$scope.error = true;
			});
		}

		$scope.doDeleteItem = function(id) {
			$http({
				method : 'GET',
				url : '/shoppingCart/deleteItem',
				params : {
					itemId : id
				},
				headers : {
					'Content-type' : 'application/json;charset=utf-8'
				}
			}).success(function(response) {
				$scope.error = false;
				self.doGetItems();
			}).error(function (response) {
				$scope.error = true;
			});
		}

		$scope.doClear = function() {
			$http({
				method : 'GET',
				url : '/shoppingCart/clear',
				headers : {
					'Content-type' : 'application/json;charset=utf-8'
				}
			}).success(function(response) {
				$scope.error = false;
				self.doGetItems();
			}).error(function (response) {
				$scope.error = true;
			});
		}

		function init() {
            var loadItems = $routeParams.loadItems;

            if(loadItems == '1') {
                self.doGetItems();
			}
		}
		init();

	};

	angularApp.controllers.controller('ShoppingCartController', [ '$scope', '$http', '$routeParams', ShoppingCartController ]);
})();