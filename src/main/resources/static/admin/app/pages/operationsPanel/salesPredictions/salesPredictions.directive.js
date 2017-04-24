(function () {
  'use strict';

  angular.module('BlurAdmin.pages.operationsPanel')
      .directive('salesPredictions', salesPredictions);

  /** @ngInject */
  function salesPredictions() {
    return {
      restrict: 'E',
      controller: 'SalesPredictionsCtrl',
      templateUrl: 'app/pages/operationsPanel/salesPredictions/salesPredictions.html'
    };
  }
})();