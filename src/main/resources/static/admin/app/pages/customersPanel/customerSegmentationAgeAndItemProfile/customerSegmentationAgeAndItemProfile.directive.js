(function () {
  'use strict';

  angular.module('BlurAdmin.pages.customersPanel')
      .directive('customerSegmentationAgeAndItemProfile', customerSegmentationAgeAndItemProfile);

  /** @ngInject */
  function customerSegmentationAgeAndItemProfile() {
    return {
      restrict: 'E',
      controller: 'CustomerSegmentationAgeAndItemProfileCtrl',
      templateUrl: 'app/pages/customersPanel/customerSegmentationAgeAndItemProfile/customerSegmentationAgeAndItemProfile.html'
    };
  }
})();