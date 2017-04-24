(function () {
  'use strict';

  angular.module('BlurAdmin.pages.customersPanel')
      .directive('bestReviewers', bestReviewers);

  /** @ngInject */
  function bestReviewers() {
    return {
      restrict: 'E',
      controller: 'BestReviewersCtrl',
      templateUrl: 'app/pages/customersPanel/bestReviewers/bestReviewers.html'
    };
  }
})();