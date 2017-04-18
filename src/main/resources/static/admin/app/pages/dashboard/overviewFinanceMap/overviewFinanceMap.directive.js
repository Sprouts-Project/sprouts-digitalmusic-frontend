/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .directive('overviewFinanceMap', overviewFinanceMap);

  /** @ngInject */
  function overviewFinanceMap() {
    return {
      restrict: 'E',
      controller: 'OverviewFinanceMapCtrl',
      templateUrl: 'app/pages/dashboard/overviewFinanceMap/overviewFinanceMap.html'
    };
  }
})();