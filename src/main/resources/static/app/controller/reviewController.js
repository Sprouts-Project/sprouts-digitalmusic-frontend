'use strict';
(function () {
    var ReviewController = function ($scope, $rootScope, $route, $timeout, $http) {
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
                    $scope.successReview = true;
                    $rootScope.$emit("doGetReviewsAfterCreateOne", {});
                    $timeout(function(){ $scope.setSuccessReview(); }, 3000);
                    $scope.review.summary = $scope.review.reviewText = $scope.review.overall = null;
                } else {
                    $scope.error = true;
                }
            }).error(function (response) {
                $scope.error = true;
            });
        }
        
        $scope.setSuccessReview = function(){
        	$scope.successReview = false;
        }

        $scope.doSubmit = function (itemId) {
            self.createReview(itemId);
        }
        
        $scope.successReviewReload = function() {
        	$route.reload();
        }

    };

    angularApp.controllers.controller('ReviewController', ['$scope', '$rootScope', '$route', '$timeout', '$http', ReviewController]);
})();