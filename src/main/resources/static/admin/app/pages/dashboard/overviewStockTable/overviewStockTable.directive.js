/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .directive('overviewStockTable', overviewStockTable);

  /** @ngInject */
  function overviewStockTable() {
    return {
      restrict: 'E',
      controller: 'OverviewStockTableCtrl',
      templateUrl: 'app/pages/dashboard/overviewStockTable/overviewStockTable.html'
    };
  }
})();