/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.operationsPanel')
      .directive('monthlySalesPredictionsByState', monthlySalesPredictionsByState);

  /** @ngInject */
  function monthlySalesPredictionsByState() {
    return {
      restrict: 'E',
      controller: 'MonthlySalesPredictionsByStateCtrl',
      templateUrl: 'app/pages/operationsPanel/monthlySalesPredictionsByState/monthlySalesPredictionsByState.html'
    };
  }
})();