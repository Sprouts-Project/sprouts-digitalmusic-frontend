'use strict';
(function () {
    var ReviewController = function ($scope, $http) {
        $scope.review,
            $scope.error = false;

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

    };

    angularApp.controllers.controller('ReviewController', ['$scope', '$http', ReviewController]);
})();