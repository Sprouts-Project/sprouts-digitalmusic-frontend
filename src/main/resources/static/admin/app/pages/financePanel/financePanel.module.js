/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.financePanel', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('financePanel', {
          url: '/dashboard/financePanel',
          templateUrl: 'app/pages/financePanel/financePanel.html',
          title: 'Finance panel',
          sidebarMeta: {
            icon: 'ion-cash',
            order: 0,
          },
        });
  }

})();