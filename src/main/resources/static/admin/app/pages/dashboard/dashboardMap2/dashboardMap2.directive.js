/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .directive('dashboardMap2', dashboardMap2);

  /** @ngInject */
  function dashboardMap2() {
    return {
      restrict: 'E',
      controller: 'DashboardMap2Ctrl',
      templateUrl: 'app/pages/dashboard/dashboardMap2/dashboardMap2.html'
    };
  }
})();