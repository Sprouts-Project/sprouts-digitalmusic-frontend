(function () {
  'use strict';

  angular.module('BlurAdmin.pages.operationsPanel')
      .directive('itemProfiles', itemProfiles);

  /** @ngInject */
  function itemProfiles() {
    return {
      restrict: 'E',
      controller: 'ItemProfilesCtrl',
      templateUrl: 'app/pages/operationsPanel/itemProfiles/itemProfiles.html'
    };
  }
})();