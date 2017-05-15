'use strict';
(function () {
    var ItemDisplayController = function ($scope, $rootScope, $http, $routeParams, $filter, AuthService) {
        $scope.item,
            $scope.showForm = false,
            $scope.all_reviews = [],
            $scope.average = 0.,
            $scope.reviews = [],
            $scope.counterReview = 1,
            $scope.showLoadMore = true;

        const NUMBER_OF_REVIEWS = 5;

        self.doGetItem = function (id) {
            $http({
                method: 'GET',
                url: '/item/display',
                params: {
                    itemId: id
                }
            }).success(function (response) {
                $scope.item = response[0];
                $scope.error = false;
                self.doGetReviews($scope.item.id);
            }).error(function (response) {
                $scope.error = true;
            });
        }

        self.doGetReviews = function (id) {
            $http({
                method: 'GET',
                url: '/review/findByItem',
                params: {
                    itemId: id
                }
            }).success(function (response) {
                $scope.all_reviews = response;
                $scope.reviews = $scope.all_reviews.slice(0, NUMBER_OF_REVIEWS);
                if ($scope.reviews.length < NUMBER_OF_REVIEWS || $scope.all_reviews.length == NUMBER_OF_REVIEWS) {
                    $scope.showLoadMore = false;
                }

                if ($scope.all_reviews.length > 0) {
                    var sum = 0;
                    for (var i = 0; i < $scope.all_reviews.length; i++) {
                        sum += parseInt($scope.all_reviews[i].overall, 10);
                    }
                    var avg = sum / $scope.all_reviews.length;

                    $scope.average = avg;
                }
                $scope.error = false;
            }).error(function (response) {
                $scope.error = true;
            });
        }


        self.doIBoughtIt = function (id) {
            $http({
                method: 'GET',
                url: '/item/itemBoughtByCostumer',
                params: {
                    itemId: id
                }
            }).success(function (response) {
                $scope.showForm = response;
                $scope.error = false;
            }).error(function (response) {
                $scope.error = true;
            });
        }

        self.doGetRecommends = function (id) {
            $http({
                method: 'GET',
                url: '/recommender/also-bought-recommender',
                params: {
                    itemId: id
                }
            }).success(function (response) {
                var itemsToRecommend = $filter('orderBy')(response.alsoBought, 'quantity', true).slice(0, 12);
                $scope.recommends = itemsToRecommend.sort(function () {
                    return 0.5 - Math.random()
                }).slice(0, 6); // get 6 random elements from the above array
                $scope.error = false;
            }).error(function (response) {
                $scope.recommends = [];
                $scope.error = true;
            });
        }

        self.doGetRecommendsItemprofiles = function (id) {
            $http({
                method: 'GET',
                url: '/recommender/item-profile-recommender',
                params: {
                    itemId: id
                }
            }).success(function (response) {
                $scope.recommendsItemProfile = response.items;
                $scope.categoriesItemProfile = response.categories;
                $scope.error = false;
            }).error(function (response) {
                $scope.recommendsItemProfile = [];
                $scope.error = true;
            });
        }

        self.loadmore = function () {
            var index = $scope.counterReview * NUMBER_OF_REVIEWS;
            var sublist = $scope.all_reviews.slice(index, index + NUMBER_OF_REVIEWS);
            if (sublist.length < NUMBER_OF_REVIEWS || $scope.all_reviews.length == index + NUMBER_OF_REVIEWS) {
                $scope.showLoadMore = false;
            }

            var i;
            for (i = 0; i < sublist.length; i++) {
                $scope.reviews.push(sublist[i]);
            }
            $scope.counterReview = $scope.counterReview + 1;
            $scope.$apply();
        }

        function init() {
            var id = $routeParams.itemId;
            if (id > 0) {
                self.doIBoughtIt(id);
                self.doGetItem(id);
                self.doGetRecommends(id);
                self.doGetRecommendsItemprofiles(id);
            }

        }

        init();

    };

    angularApp.controllers.controller('ItemDisplayController', ['$scope', '$rootScope', '$http', '$routeParams', '$filter', 'AuthService', ItemDisplayController]);
})();