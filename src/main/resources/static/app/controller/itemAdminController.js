'use strict';
(function() {
	var ItemAdminController = function($scope, $http, $routeParams, $location) {
		$scope.item,
		$scope.numberOfSales,
		$scope.categories = [],
		$scope.error = false;

		self.doGetCategories = function() {
			$http({
				method : 'GET',
				url : '/category/list'
			}).success(function(response) {
				$scope.categories = response;
				$scope.error = false;
			}).error(function (response) {
				$scope.error = true;
			});
		}

		self.createItem = function() {
			$http({
				method : 'POST',
				url : '/item/admin/create',
				data : $scope.item,
				headers : {
					'Content-type' : 'application/json;charset=utf-8'
				}
			}).success(function(response) {
				$scope.error = false;
                $location.path('/item/list');
			}).error(function(response) {
				$scope.errors = true;
			});
		}

		$scope.doDeleteItem = function(id, version) {
			$http({
				method : 'POST',
				url : '/item/admin/delete',
				data : {
					id : id,
					version : version
				},
				headers : {
					'Content-type' : 'application/json;charset=utf-8'
				}
			}).success(function(response) {
				$scope.error = false;
				$location.path('/item/list');
			}).error(function (response) {
				$scope.error = true;
			});
		}

		self.doEditItem = function(id) {
			$http({
				method : 'GET',
				url : '/item/display',
				params : {
					itemId : id
				}
			}).success(function(response) {
				$scope.item = response[0];
				$scope.numberOfSales = response[1];
				$scope.error = false;
			}).error(function(response) {
				$scope.error = true;
			});
		}

		$scope.doSubmit = function() {
			self.createItem();
		}

		$scope.reset = function() {
			$scope.item.$setPristine();
		}

		function init() {
			self.doGetCategories();
			var id = $routeParams.itemId;
			if(id>0){
				self.doEditItem(id);
			}
		}
		init();

	};

	angularApp.controllers.controller('ItemAdminController', [ '$scope', '$http', '$routeParams', '$location', ItemAdminController ]);
})();