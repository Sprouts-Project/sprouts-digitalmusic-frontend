'use strict';

var angularApp = angular.module('angularApp', ['ngRoute', 'angularAppControllers', 'ngSanitize', 'swaggerUi', 'pascalprecht.translate', 'ngResource', 'ngCookies']);

angularApp.controllers = angular.module('angularAppControllers', ['ngRoute']);

angularApp.config(['$translateProvider', function ($translateProvider) {
    $translateProvider.useStaticFilesLoader({
        files: [{
            prefix: 'locale-',
            suffix: '.json'
        }, {
            prefix: '/app/view/user/locale-',
            suffix: '.json'
        }, {
            prefix: '/app/view/car/locale-',
            suffix: '.json'
        }, {
            prefix: '/app/view/api/locale-',
            suffix: '.json'
        }, {
            prefix: '/app/view/login/locale-',
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