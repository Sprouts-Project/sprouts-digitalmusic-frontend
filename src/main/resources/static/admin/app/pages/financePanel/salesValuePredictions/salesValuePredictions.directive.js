(function () {
  'use strict';

  angular.module('BlurAdmin.pages.financePanel')
      .directive('salesValuePredictions', salesValuePredictions);

  /** @ngInject */
  function salesValuePredictions() {
    return {
      restrict: 'E',
      controller: 'SalesValuePredictionsCtrl',
      templateUrl: 'app/pages/financePanel/salesValuePredictions/salesValuePredictions.html'
    };
  }
})();