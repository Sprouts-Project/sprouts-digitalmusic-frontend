/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .directive('overviewStockMap', overviewStockMap);

  /** @ngInject */
  function overviewStockMap() {
    return {
      restrict: 'E',
      controller: 'OverviewStockMapCtrl',
      templateUrl: 'app/pages/dashboard/overviewStockMap/overviewStockMap.html'
    };
  }
})();