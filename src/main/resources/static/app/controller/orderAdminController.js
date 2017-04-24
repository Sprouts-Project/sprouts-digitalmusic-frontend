'use strict';
(function() {
	var OrderAdminController = function($scope, $http, AuthService) {
		$scope.orders = [],
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
		$scope.authority = AuthService.getAuthority();

		$scope.reloadPaginated = function(page) {
			$scope.paginationInfo.currentPage = page;
			init();
		}

		self.doGetOrders = function(pageNumber) {
			$http({
				method : 'GET',
				url : '/order/admin/list',
				params : {
					pageNumber : pageNumber
				}
			}).success(function(response) {
				$scope.orders = response[0];
				$scope.paginationInfo = response[1];
				$scope.error = false;
			}).error(function (response) {
				$scope.error = true;
	        });
		}

		$scope.markAsDelivered = function(id){
            $http({
                method : 'GET',
                url : '/order/admin/markAsDelivered',
                params : {
                    orderId : id
                }
            }).success(function(response) {
               	init();
                $scope.error = false;
            }).error(function (response) {
                $scope.error = true;
            });

		};

		function init() {
			self.doGetOrders($scope.paginationInfo.currentPage);
		}
		init();

	};

	angularApp.controllers.controller('OrderAdminController', [ '$scope', '$http', 'AuthService', OrderAdminController ]);
})();