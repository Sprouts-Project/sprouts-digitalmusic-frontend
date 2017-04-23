(function () {
  'use strict';

  angular.module('BlurAdmin.pages.customersPanel')
      .directive('customerSegmentationAgeAndBrand', customerSegmentationAgeAndBrand);

  /** @ngInject */
  function customerSegmentationAgeAndBrand() {
    return {
      restrict: 'E',
      controller: 'CustomerSegmentationAgeAndBrandCtrl',
      templateUrl: 'app/pages/customersPanel/customerSegmentationAgeAndBrand/customerSegmentationAgeAndBrand.html'
    };
  }
})();