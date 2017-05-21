(function() {
	'use strict';

	angular.module('BlurAdmin.pages.customersPanel').controller(
			'BestReviewersCtrl', BestReviewersCtrl);

	/** @ngInject */
	function BestReviewersCtrl($element, $scope, $http, orderByFilter, baConfig,
			layoutPaths) {
		$http.get('/dashboard/best-reviewers').then(function(response) {
			$scope.reviewers = orderByFilter(response.data, 'usefullness', true);
		});
	}

})();