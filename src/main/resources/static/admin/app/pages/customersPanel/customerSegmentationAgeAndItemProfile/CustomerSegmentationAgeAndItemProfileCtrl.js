/**
 * @author v.lugovksy created on 16.12.2015
 */
(function() {
	'use strict';

	angular.module('BlurAdmin.pages.customersPanel').controller(
			'CustomerSegmentationAgeAndItemProfileCtrl',
			CustomerSegmentationAgeAndItemProfileCtrl);

	/** @ngInject */
	function CustomerSegmentationAgeAndItemProfileCtrl($scope, $http,
			orderByFilter, baConfig) {
		var layoutColors = baConfig.colors;

		$http.get('/dashboard/customer-segmentation-age-and-item-profile').then(
				function(response) {
					var dataArr = orderByFilter(response.data, "number_customers", true)
					$scope.itemsip = dataArr;
					setChartData(dataArr);
				});

		$scope.optionsip = {
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
			$scope.labelsip = labels;
			$scope.dataip = data;
		}
	}

})();