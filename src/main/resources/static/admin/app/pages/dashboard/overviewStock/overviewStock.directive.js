/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .directive('overviewStock', overviewStock);

  /** @ngInject */
  function overviewStock() {
    return {
      restrict: 'E',
      controller: 'OverviewStockCtrl',
      templateUrl: 'app/pages/dashboard/overviewStock/overviewStock.html'
    };
  }
})();