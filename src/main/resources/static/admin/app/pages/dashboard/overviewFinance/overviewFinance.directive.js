/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .directive('overviewFinance', overviewFinance);

  /** @ngInject */
  function overviewFinance() {
    return {
      restrict: 'E',
      controller: 'OverviewFinanceCtrl',
      templateUrl: 'app/pages/dashboard/overviewFinance/overviewFinance.html'
    };
  }
})();