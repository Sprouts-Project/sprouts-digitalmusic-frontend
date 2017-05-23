'use strict';
(function () {
    var ItemController = function ($scope, $http, AuthService) {
        $scope.items = [],
            $scope.paginationInfo = {
                showFirstEllipsis: false,
                showLastEllipsis: true,
                currentPage: '0',
                minPage: '0',
                maxPage: '5'
            },
            $scope.range = function () {
                var result = [];
                for (var i = $scope.paginationInfo.minPage + 1; i < $scope.paginationInfo.maxPage; i++) {
                    if (i != $scope.paginationInfo.totalPages - 1) {
                        result.push(i);
                    }
                }
                return result;
            },
            $scope.error = false;

        $scope.reloadPaginated = function (page) {
            $scope.paginationInfo.currentPage = page;
            init();
        }

        function init() {
            $http({
                method: 'GET',
                url: '/item/list',
                params: {
                    pageNumber: $scope.paginationInfo.currentPage
                }
            }).success(function (response) {
                $scope.items = response[0];
                $scope.paginationInfo = response[1];
                var range = $scope.range();
                if (range[0] >= 2) {
                    $scope.paginationInfo.showFirstEllipsis = true;
                } else {
                    $scope.paginationInfo.showFirstEllipsis = false;
                }

                if (range[range.length - 1] <= $scope.paginationInfo.totalPages - 3) {
                    $scope.paginationInfo.showLastEllipsis = true;
                } else {
                    $scope.paginationInfo.showLastEllipsis = false;
                }
                $scope.error = false;
            }).error(function (response) {
                $scope.error = true;
            });
        }

        init();

    };

    angularApp.controllers.controller('ItemController', ['$scope', '$http', 'AuthService', ItemController]);
})();