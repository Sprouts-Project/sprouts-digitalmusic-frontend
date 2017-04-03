'use strict';
(function() {
	var ItemController = function($scope, $http) {
		$scope.items = [],
		$scope.paginationInfo = {
				currentPage : '0',
				minPage : '0',
				maxPage : '5'
		},
  		$scope.range = function() {
			var result = [];
			for (var i = $scope.paginationInfo.minPage; i < $scope.paginationInfo.maxPage; i++) {
				result.push(i);
			}
			return result;
		},
		$scope.error = false;
		
		$scope.reloadPaginated = function(page) {
			$scope.paginationInfo.currentPage = page;
			console.log(page);
			init();
		}
		
		self.doGetItems = function(pageNumber) {
			$http({
				method : 'GET',
				url : '/item/list',
				params : {
					pageNumber : pageNumber
				}
			}).success(function(response) {
				$scope.items = response[0];
				$scope.paginationInfo = response[1];
				$scope.error = false;
			}).error(function (response) {
				$scope.error = true;
	        });
		}

		function init() {
			self.doGetItems($scope.paginationInfo.currentPage);
		}
		init();

	};

	angularApp.controllers.controller('ItemController', [ '$scope', '$http', ItemController ]);
})();