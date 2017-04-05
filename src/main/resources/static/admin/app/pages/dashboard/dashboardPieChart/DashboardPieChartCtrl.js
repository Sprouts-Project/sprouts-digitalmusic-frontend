/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('DashboardPieChartCtrl', DashboardPieChartCtrl);

  /** @ngInject */
  function DashboardPieChartCtrl($scope, $http, $timeout, baConfig, baUtil) {
    var pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);
    $http.get('/dashboard/customer-overview').then(function(response) {
    	$scope.charts = [{
    	      color: pieColor,
    	      description: 'Average age',
    	      stats: parseFloat(response.data.average_age).toFixed(2),
    	      icon: 'person',
    	    }, {
    	      color: pieColor,
    	      description: 'Female average age',
    	      stats: parseFloat(response.data.average_age_female).toFixed(2),
    	      icon: 'money',
    	    }, {
    	      color: pieColor,
    	      description: 'Male average age',
    	      stats: parseFloat(response.data.average_age_male).toFixed(2),
    	      icon: 'face',
    	    }
    	    ];
	});
  }
})();