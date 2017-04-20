/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .directive('overviewCustomer', overviewCustomer);

  /** @ngInject */
  function overviewCustomer() {
    return {
      restrict: 'E',
      controller: 'OverviewCustomerCtrl',
      templateUrl: 'app/pages/dashboard/overviewCustomer/overviewCustomer.html'
    };
  }
})();