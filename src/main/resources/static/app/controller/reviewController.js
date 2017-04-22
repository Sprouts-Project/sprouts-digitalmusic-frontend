'use strict';
(function() {
	var reviewController = function($scope, $http, $routeParams, $location) {
		$scope.review,
		$scope.error = false;

		self.createReview = function() {
			$http({
				method : 'POST',
				url : '/review/admin/create',
				data : $scope.review,
				headers : {
					'Content-type' : 'application/json;charset=utf-8'
				}
			}).success(function(response) {
				$scope.error = false;
			}).error(function(response) {
				$scope.errors = true;
			});
		}

		$scope.doDeleteReview = function(id, version) {
			$http({
				method : 'POST',
				url : '/review/admin/delete',
				data : {
					id : id,
					version : version
				},
				headers : {
					'Content-type' : 'application/json;charset=utf-8'
				}
			}).success(function(response) {
				$scope.error = false;
				$location.path('/');
			}).error(function (response) {
				$scope.error = true;
			});
		}

		

		$scope.doSubmit = function() {
			self.createReview();
		}

		$scope.reset = function() {
			$scope.item.$setPristine();
		}

		function init() {
			
		}
		init();

	};

	angularApp.controllers.controller('reviewController', [ '$scope', '$http', '$routeParams', '$location', reviewController ]);
})();