/**
 * @author v.lugovksy created on 16.12.2015
 */
(function() {
	'use strict';

	angular.module('BlurAdmin.pages.operationsPanel').controller(
			'MonthlySalesPredictionsByItemProfileCtrl',
			MonthlySalesPredictionsByItemProfileCtrl);

	/** @ngInject */
	function MonthlySalesPredictionsByItemProfileCtrl($element, $scope, $http,
			orderByFilter, baConfig, layoutPaths) {
		var layoutColors = baConfig.colors;

		$http.get('/dashboard/sales-predictions-by-item-profiles').then(
				function(response) {
					var dataArr = response.data;

					var month = 1;
					var year = 2018;

					var options = [];
					for (var i = 0; i < dataArr.length; i++) {
						options.push({
							name : dataArr[i].month + "/" + dataArr[i].year,
							month : dataArr[i].month,
							year : dataArr[i].year,
							itemProfiles : dataArr[i].item_profile_sales
						});
					}
					// sort dates
					$scope.dropDownOptions = options.sort(function(a, b) {
						return new Date(a.year, a.month, 1)
								- new Date(b.year, b.month, 1);
					});
					
					$scope.selectedOption = options[0];
					setChartData(options[0].itemProfiles);
					
				});


		function setChartData(itemProfiles) {
			$scope.items = itemProfiles;
		}

		$scope.update = function() {
			var data = $scope.selectedOption.itemProfiles;
			setChartData(data)
		}

	}

})();