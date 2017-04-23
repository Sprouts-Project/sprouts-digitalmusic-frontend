/**
 * @author v.lugovksy created on 16.12.2015
 */
(function() {
	'use strict';

	angular.module('BlurAdmin.pages.customersPanel').controller(
			'CustomerSegmentationAgeAndBrandCtrl',
			CustomerSegmentationAgeAndBrandCtrl);

	/** @ngInject */
	function CustomerSegmentationAgeAndBrandCtrl($element, $scope, $http,
			orderByFilter, baConfig, layoutPaths) {
		var layoutColors = baConfig.colors;

		$http.get('/dashboard/customer-segmentation-age-and-brand').then(
				function(response) {
					var dataArr = orderByFilter(response.data, "number_customers", true)
					$scope.items = dataArr;
					setChartData(dataArr);
				});

		$scope.options = {
			elements : {
				arc : {
					borderWidth : 0
				}
			},
			legend : {
				display : true,
				position : 'bottom',
				labels : {
					fontColor : layoutColors.defaultText
				}
			}
		};

		function setChartData(dataArr) {
			var labels = [];
			var data = [];

			for (var j = 0; j < dataArr.length; j++) {
				labels.push(dataArr[j].profile_id);
				data.push(dataArr[j].number_customers);
			}
			$scope.labels = labels;
			$scope.data = data;
		}
	}

})();