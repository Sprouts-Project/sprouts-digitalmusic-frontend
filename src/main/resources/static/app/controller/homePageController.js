'use strict';
(function() {
	var HomePageController = function($scope, $http, $filter, AuthService) {
        self.collaborativeRecommender = function () {
            $http({
                method: 'GET',
                url: '/recommender/collaborative-filtering-recommender'
            }).success(function (response) {
                $scope.collaborativeRecommender = response;
                $scope.error = false;
            }).error(function (response) {
                $scope.error = true;
            });
        };
        
        self.bestSellerRecommender = function() {
            $http({
                method: 'GET',
                url: '/recommender/most-sold-during-last-six-months'
            }).success(function (response) {
            	
            	var bestSellers = $filter('orderBy')(response, 'quantity', true).slice(0, 12);
            	
                $scope.bestSellers = bestSellers.sort(function () {
                    return 0.5 - Math.random()
                }).slice(0, 6); // get 6 random elements from the above array
            	
                $scope.error = false;
            }).error(function (response) {
                $scope.error = true;
            });
        };
        
        self.bestRatedRecommender = function() {
            $http({
                method: 'GET',
                url: '/recommender/best-reviewed-during-last-six-months'
            }).success(function (response) {
            	
            	var bestRated = $filter('orderBy')(response, 'averageOverall', true).slice(0, 12);
            	
                $scope.bestRated = bestRated.sort(function () {
                    return 0.5 - Math.random()
                }).slice(0, 6); // get 6 random elements from the above array
            	
                $scope.error = false;
            }).error(function (response) {
                $scope.error = true;
            });
        }
		
        function init() {
        	self.collaborativeRecommender();
        	self.bestSellerRecommender();
        	self.bestRatedRecommender();
        }

        init();

	};

	angularApp.controllers.controller('HomePageController', [ '$scope', '$http', '$filter', 'AuthService', HomePageController ]);
})();