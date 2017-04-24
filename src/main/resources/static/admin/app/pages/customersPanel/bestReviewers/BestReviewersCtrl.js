(function() {
	'use strict';

	angular.module('BlurAdmin.pages.customersPanel').controller(
			'BestReviewersCtrl', BestReviewersCtrl);

	/** @ngInject */
	function BestReviewersCtrl($element, $scope, $http, orderByFilter, baConfig,
			layoutPaths) {
		var layoutColors = baConfig.colors;

		$http.get('/dashboard/best-reviewers').then(function(response) {
			$scope.reviewers = orderByFilter(response.data, 'usefullness', true);
		});
	}

})();