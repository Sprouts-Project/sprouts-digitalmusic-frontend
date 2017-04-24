'use strict';
(function () {
    var CustomerController = function ($scope, $http, $resource, $httpParamSerializer, $cookies, $window, AuthService) {

        $scope.customerInfo;
        $scope.userAccountInfo;


        self.doGetPersonalData = function () {
            $http({
                method : 'GET',
                url : '/customer/show'
            }).success(function(response) {
                var userAccountInfo = response["userAccount"];
                delete response["userAccount"];
                var customerInfo = response;
                customerInfo["birthdate"] = new Date(customerInfo["birthdate"]);
                $scope.customerInfo = customerInfo;
                $scope.userAccountInfo = userAccountInfo;
                $scope.error = false;
            }).error(function (response) {
                $scope.error = true;
            })
        };

        $scope.editData = function(){
            var customerForm = $scope.customerInfo;
            customerForm["username"] = $scope.userAccountInfo["username"];
            customerForm["password"] = $scope.userAccountInfo["password"];
            customerForm["oldPassword"] = $scope.userAccountInfo["confirm_password"];

            $http({
                method : 'POST',
                url : '/customer/edit',
                data : customerForm,
                headers : {
                    'Content-type' : 'application/json;charset=utf-8'
                }
            }).success(function (response) {
                if (response["success"]) {
                    AuthService.logout();
                } else {
                    $scope.error = true;
                }
            }).error(function (response) {
                $scope.error = true;
            });
        };

        function init() {
            self.doGetPersonalData();
        }
        init();

    };

    angularApp.controllers.controller('CustomerController', ['$scope', '$http', '$resource', '$httpParamSerializer', '$cookies', '$window', 'AuthService', CustomerController]);
})();