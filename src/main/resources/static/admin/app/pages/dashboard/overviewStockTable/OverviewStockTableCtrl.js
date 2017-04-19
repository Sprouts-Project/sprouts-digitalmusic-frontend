/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('OverviewStockTableCtrl', OverviewStockTableCtrl);

  /** @ngInject */
  function OverviewStockTableCtrl($scope, $http, $timeout, baConfig, baUtil) {
    $http.get('/dashboard/operation-overview').then(function(response) {
    	    	
    	var topProducts = [];
    	
    	response.data.top_products.forEach(function(item, index){
    		topProducts.push({ id: item.id, title: item.title, quantity: item.quantity });
    	});
    	
    	$scope.products = topProducts;
	});
  }
})();