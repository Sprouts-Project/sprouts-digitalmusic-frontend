'use strict';
(function () {
    var LoginController = function ($scope, $http, $resource, $httpParamSerializer, $cookies) {

        $scope.login = function () {

            $scope.formRequest = {
                grant_type: "password",
                username: $scope.loginCredentials.username,
                password: $scope.loginCredentials.password
            };
            $scope.encoded = btoa("sproutsApp:sproutsAppSecret");

            $cookies.remove("access_token");
            var req = {
                method: 'POST',
                url: "/oauth/token",
                headers: {
                    "Authorization": "Basic " + $scope.encoded,
                    "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
                },
                data: $httpParamSerializer($scope.formRequest)
            }
            $http(req).then(function (data) {
                $http.defaults.headers.common.Authorization =
                    'Bearer ' + data.data.access_token;
                $cookies.put("access_token", data.data.access_token);
                window.location.href = "/";
                console.log(data.data.access_token)
            });
        };

        $scope.logout = function(){
            $cookies.remove("access_token");
            $http.get("/oauth/revoke");
            window.location.replace('/');

        };
    };

    angularApp.controllers.controller('LoginController', ['$scope', '$http', '$resource', '$httpParamSerializer', '$cookies', LoginController]);
})();