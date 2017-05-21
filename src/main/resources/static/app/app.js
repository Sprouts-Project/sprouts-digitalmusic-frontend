'use strict';

var angularApp = angular.module('angularApp', ['ngRoute', 'angularAppControllers', 'ngSanitize', 'swaggerUi', 'pascalprecht.translate', 'ngResource', 'ngCookies']);

angularApp.controllers = angular.module('angularAppControllers', ['ngRoute']);

angularApp.config(['$translateProvider', function ($translateProvider) {
    $translateProvider.useStaticFilesLoader({
        files: [{
            prefix: 'locale-',
            suffix: '.json'
        }, {
            prefix: '/app/view/item/locale-',
            suffix: '.json'
        }, {
            prefix: '/app/view/about/locale-',
            suffix: '.json'
        }, {
            prefix: '/app/view/shoppingCart/locale-',
            suffix: '.json'
        }, {
            prefix: '/app/view/api/locale-',
            suffix: '.json'
        }, {
            prefix: '/app/view/login/locale-',
            suffix: '.json'
        }, {
            prefix: '/app/view/signup/locale-',
            suffix: '.json'
        }, {
            prefix: '/app/view/customer/locale-',
            suffix: '.json'
        }, {
            prefix: '/app/view/order/locale-',
            suffix: '.json'
        }, {
            prefix: '/app/view/homePage/locale-',
            suffix: '.json'
        }
        ]
    });
    $translateProvider.preferredLanguage('en');
}]);

angularApp.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push(['$q', function ($q) {

        return {
            request: function (httpConfig) {
                var $cookies;
                angular.injector(['ngCookies']).invoke(['$cookies', function (_$cookies_) {
                    $cookies = _$cookies_;
                }]);

                if ($cookies.get("access_token")) {

                    httpConfig.headers['Authorization'] = 'Bearer ' + $cookies.get("access_token");

                }

                return httpConfig;
            },
            responseError: function (response) {
                return $q.reject(response);
            }
        };
    }]);
}]);

angularApp.controller('languageController', ['$translate', '$scope',
    function ($translate, $scope) {

        $scope.changeLanguage = function (langKey) {
            $translate.use(langKey);
        };
    }]);

angularApp.service('AuthService', ['$http', function ($http) {
    var $cookies;
    angular.injector(['ngCookies']).invoke(['$cookies', function (_$cookies_) {
        $cookies = _$cookies_;
    }]);

    this.getAuthority = function () {
        var authority = null;
        if ($cookies.get("access_token") && $cookies.get("authority")) {
            authority = $cookies.get("authority");
        }
        return authority;
    };

    this.logout = function () {
        $http.get("/oauth/revoke").then(function () {
            $cookies.remove("authority");
            $cookies.remove("access_token");
            window.location.replace('/');
        });
    };

}]);