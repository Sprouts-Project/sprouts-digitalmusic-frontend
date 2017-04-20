/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages', [
    'ui.router',
    'BlurAdmin.pages.dashboard',
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($urlRouterProvider, baSidebarServiceProvider) {
    $urlRouterProvider.otherwise('/dashboard');

    baSidebarServiceProvider.addStaticItem({
      title: 'Customers panel',
      icon: 'ion-person',
    });
    baSidebarServiceProvider.addStaticItem({
      title: 'Finance panel',
      icon: 'ion-cash',
    });
    baSidebarServiceProvider.addStaticItem({
        title: 'Operation panel',
        icon: 'ion-ios-cog',
      });
  }

})();
