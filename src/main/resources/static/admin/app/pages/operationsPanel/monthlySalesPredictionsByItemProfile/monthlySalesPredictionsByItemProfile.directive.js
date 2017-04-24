/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.operationsPanel')
      .directive('monthlySalesPredictionsByItemProfile', monthlySalesPredictionsByItemProfile);

  /** @ngInject */
  function monthlySalesPredictionsByItemProfile() {
    return {
      restrict: 'E',
      controller: 'MonthlySalesPredictionsByItemProfileCtrl',
      templateUrl: 'app/pages/operationsPanel/monthlySalesPredictionsByItemProfile/monthlySalesPredictionsByItemProfile.html'
    };
  }
})();