'use strict';
(function () {
    var OrderController = function ($scope, $http, $resource, $httpParamSerializer, $cookies, $window, AuthService) {
        $scope.showForm = true;

        $scope.createOrder = function () {
            var order = {
                "creditCard": {
                    "cvv": $scope.orderInfo["cvv"],
                    "brand": $scope.orderInfo["brand"],
                    "expire": $scope.orderInfo["expire"],
                    "number": $scope.orderInfo["number"]
                },
                "address": $scope.orderInfo["address"]
            }

            $http({
                method: 'POST',
                url: '/order/create',
                data: order,
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).success(function (response) {
                $scope.showForm = false;
            }).error(function (response) {
                $scope.error = true;
            });
        };

    };

    angularApp.controllers.controller('OrderController', ['$scope', '$http', '$resource', '$httpParamSerializer', '$cookies', '$window', 'AuthService', OrderController]);
})();