'use strict';
(function () {
    var SignupController = function ($scope, $http, $resource, $httpParamSerializer, $cookies, $window, AuthService) {

        $scope.customerInfo = {
            sex : 'M'
        }

        $scope.signup = function () {
            var customer = $scope.customerInfo;
            customer["userAccount"] = $scope.userAccountInfo;

            $http({
                method : 'POST',
                url : '/customer/create',
                data : customer,
                headers : {
                    'Content-type' : 'application/json;charset=utf-8'
                }
            }).success(function (response) {
                if (response["success"]) {
                    window.location.href = "/#/login";
                } else {
                    $scope.error = true;
                }
            }).error(function (response) {
                $scope.error = true;
            });
        };


    };

    angularApp.controllers.controller('SignupController', ['$scope', '$http', '$resource', '$httpParamSerializer', '$cookies', '$window', 'AuthService', SignupController]);
})();