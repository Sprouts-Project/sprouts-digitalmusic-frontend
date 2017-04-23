'use strict';
(function() {
	var ItemDisplayController = function($scope, $http, $routeParams, AuthService) {
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

		function init() {
			var id = $routeParams.itemId;
			if(id>0){
				
				self.doGetItem(id);
			}
			
		}
		init();

	};

	angularApp.controllers.controller('ItemDisplayController', [ '$scope', '$http', '$routeParams', 'AuthService', ItemDisplayController ]);
})();