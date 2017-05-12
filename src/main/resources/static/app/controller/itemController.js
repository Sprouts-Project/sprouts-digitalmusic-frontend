'use strict';
(function() {
	var ItemController = function($scope, $rootScope, $http, AuthService) {
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
			init();
		}

		function init() {
            $http({
                method : 'GET',
                url : '/item/list',
                params : {
                    pageNumber : $scope.paginationInfo.currentPage
                }
            }).success(function(response) {
                $scope.items = response[0];
                $scope.paginationInfo = response[1];
                $scope.error = false;
            }).error(function (response) {
                $scope.error = true;
            });
		}
		init();

	};

	angularApp.controllers.controller('ItemController', [ '$scope', '$rootScope', '$http', 'AuthService', ItemController ]);
})();