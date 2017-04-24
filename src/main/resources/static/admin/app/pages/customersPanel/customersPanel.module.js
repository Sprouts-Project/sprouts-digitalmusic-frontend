/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.customersPanel', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('customersPanel', {
          url: '/dashboard/customersPanel',
          templateUrl: 'app/pages/customersPanel/customersPanel.html',
          title: 'Customers panel',
          sidebarMeta: {
            icon: 'ion-person',
            order: 0,
          },
        });
  }

})();