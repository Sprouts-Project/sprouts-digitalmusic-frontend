/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .directive('overviewStockChart', overviewStockChart);

  /** @ngInject */
  function overviewStockChart() {
    return {
      restrict: 'E',
      controller: 'OverviewStockChartCtrl',
      templateUrl: 'app/pages/dashboard/overviewStockChart/overviewStockChart.html'
    };
  }
})();