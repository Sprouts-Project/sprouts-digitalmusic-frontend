'use strict';
(function() {
	var ItemController = function($scope, $http) {
		$scope.items = [],
		$scope.error = false;

		self.doGetItems = function() {
			$http.get('/item/list').then(function(response) {
				$scope.items = response.data;
				$scope.error = false;
			});
		}

		function init() {
			self.doGetItems();
		}
		init();

	};

	angularApp.controllers.controller('ItemController', [ '$scope', '$http', ItemController ]);
})();