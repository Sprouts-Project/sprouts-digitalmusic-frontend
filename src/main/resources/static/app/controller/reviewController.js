'use strict';
(function () {
    var ReviewController = function ($scope, $rootScope, $timeout, $http) {
        $scope.review,
            $scope.error = false,
            $rootScope.successReview = false;

        self.createReview = function (itemId) {
            $http({
                method: 'POST',
                url: '/review/create',
                data: $scope.review,
                params: {
                    itemId: itemId
                },
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).success(function (response) {
                if (response["success"]==true) {
                    $scope.error = false;
                    $rootScope.successReview = true;
                    $timeout(function(){ $scope.successReviewFalse(); }, 5000);
                } else {
                    $scope.error = true;
                }
            }).error(function (response) {
                $scope.error = true;
            });
        }

        $scope.doSubmit = function (itemId) {
            self.createReview(itemId);
        }
        
        $scope.successReviewFalse = function() {
        	$rootScope.successReview= false;
        }

    };

    angularApp.controllers.controller('ReviewController', ['$scope', '$rootScope', '$timeout', '$http', ReviewController]);
})();