'use strict';
(function() {
	var ItemDisplayController = function($scope, $http, $routeParams, $filter, AuthService) {
		$scope.item,
		$scope.showForm = false,
		$scope.reviews = []
		
		self.doGetItem = function(id) {
			$http({
				method : 'GET',
				url : '/item/display',
				params : {
					itemId : id
				}
			}).success(function(response) {
				$scope.item=response;
				$scope.error = false;
				self.doGetReviews($scope.item.id);
			}).error(function(response) {
				$scope.error = true;
			});
		}
		
		self.doGetReviews = function(id) {
			$http({
				method : 'GET',
				url : '/review/findByItem',
				params : {
					itemId : id
				}
			}).success(function(response) {
				$scope.reviews = response;
				$scope.error = false;
			}).error(function (response) {
				$scope.error = true;
			});
		}
		
		
		self.doIBoughtIt = function(id) {
			$http({
				method : 'GET',
				url : '/item/itemBoughtByCostumer',
				params : {
					itemId : id
				}
			}).success(function(response) {
				$scope.showForm=response;
				$scope.error = false;
			}).error(function (response) {
				$scope.error = true;
			});
		}

		self.doGetRecommends = function(id) {
			$http({
				method : 'GET',
				url : '/recommender/also-bought-recommender',
				params : {
					itemId : id
				}
			}).success(function(response) {
				var itemsToRecommend = $filter('orderBy')(response.alsoBought, 'quantity', true).slice(0,12);
				$scope.recommends = itemsToRecommend.sort( function() { return 0.5 - Math.random() } ).slice(0,6); // get 6 random elements from the above array
				$scope.error = false;
			}).error(function (response) {
				$scope.recommends = [];
				$scope.error = true;
			});
		}
		
		function init() {
			var id = $routeParams.itemId;
			if(id>0){
				self.doIBoughtIt(id);
				self.doGetItem(id);
				self.doGetRecommends(id)
			}
			
		}
		init();

	};

	angularApp.controllers.controller('ItemDisplayController', [ '$scope', '$http', '$routeParams', '$filter', 'AuthService', ItemDisplayController ]);
})();