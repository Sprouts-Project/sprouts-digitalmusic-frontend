'use strict';
(function() {
	var ReviewController = function($scope, $http) {
		$scope.review,
		$scope.error = false;

		self.createReview = function(itemId) {
			console.log("Entra");
			$http({
				method : 'POST',
				url : '/review/create',
				data : $scope.review,
				params : {
					itemId : itemId
				},
				headers : {
					'Content-type' : 'application/json;charset=utf-8'
				}
			}).success(function(response) {
				$scope.error = false;
			}).error(function(response) {
				$scope.errors = true;
			});
		}

		$scope.doSubmit = function(itemId) {
			self.createReview(itemId);
		}

	};

	angularApp.controllers.controller('ReviewController', [ '$scope', '$http', ReviewController ]);
})();