(function() {
	'use strict';

	angular.module('BlurAdmin.pages.operationsPanel').controller(
			'ItemProfilesCtrl', ItemProfilesCtrl);

	/** @ngInject */
	function ItemProfilesCtrl($element, $scope, $http, orderByFilter, baConfig,
			layoutPaths) {
		baConfig.colors;

		$http.get('/dashboard/item-profiles').then(function(response) {
			$scope.items = orderByFilter(response.data, 'number_items', true);
		});
	}

})();