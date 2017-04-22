'use strict';
(function() {
	var ShoppingCartController = function($scope, $http, $routeParams, $location) {
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

		$scope.doAddItem = function(itemId) {
			console.log(itemId);
			$http({
				method : 'POST',
				url : '/shoppingCart/addItem',
				data : {
					itemId : itemId
				},
				headers : {
					'Content-type' : 'application/json;charset=utf-8'
				}
			}).success(function(response) {
				$scope.error = false;
				self.doGetItems;
				console.log("prueba");
			}).error(function(response) {
				$scope.errors = true;
			});
		}

		$scope.doDeleteItem = function(id) {
			$http({
				method : 'POST',
				url : '/shoppingCart/deleteItem',
				data : {
					id : id
				},
				headers : {
					'Content-type' : 'application/json;charset=utf-8'
				}
			}).success(function(response) {
				$scope.error = false;
				self.doGetItems;
			}).error(function (response) {
				$scope.error = true;
			});
		}

		$scope.doClear = function() {
			$http({
				method : 'POST',
				url : '/shoppingCart/clear',
				headers : {
					'Content-type' : 'application/json;charset=utf-8'
				}
			}).success(function(response) {
				$scope.error = false;
				self.doGetItems;
			}).error(function (response) {
				$scope.error = true;
			});
		}

		function init() {
			self.doGetItems();
		}
		init();

	};

	angularApp.controllers.controller('ShoppingCartController', [ '$scope', '$http', '$routeParams', '$location', ShoppingCartController ]);
})();