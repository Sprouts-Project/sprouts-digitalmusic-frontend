/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.operationsPanel', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('operationsPanel', {
          url: '/dashboard/operationsPanel',
          templateUrl: 'app/pages/operationsPanel/operationsPanel.html',
          title: 'Operations panel',
          sidebarMeta: {
            icon: 'ion-ios-cog',
            order: 0,
          },
        });
  }

})();