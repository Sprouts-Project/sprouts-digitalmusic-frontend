/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('OverviewCustomerCtrl', OverviewCustomerCtrl);

  /** @ngInject */
  function OverviewCustomerCtrl($scope, $http, $timeout, baConfig, baUtil, layoutPaths) {
	  
	  function getColor(data, min, max, step){
  		var color = '#4169E1';
  		
  		if(data < (min+step)){
  			color = '#E0FFFF';
  		}else if(data < (min+2*step)){
  			color = '#B0E0E6';
  		}else if(data < (min+3*step)){
  			color = '#ADD8E6';
  		}else if(data < (min+4*step)){
  			color = '#87CEFA';
  		}else if(data < (min+5*step)){
  			color = '#6495ED';
  		}
  		return color;
  	}
	  
    var pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);
    var layoutColors = baConfig.colors;

    $http.get('/dashboard/customer-overview').then(function(response) {
    	
    	//Average customers
    	$scope.charts = [{
    	      color: pieColor,
    	      description: 'Average age',
    	      stats: parseFloat(response.data.average_age).toFixed(2),
    	      //icon: 'person',
    	    }, {
    	      color: pieColor,
    	      description: 'Female average age',
    	      stats: parseFloat(response.data.average_age_female).toFixed(2),
    	      //icon: 'money',
    	    }, {
    	      color: pieColor,
    	      description: 'Male average age',
    	      stats: parseFloat(response.data.average_age_male).toFixed(2),
    	      //icon: 'face',
    	    }
    	  ];
    	
    	//Customers by state
    	var areas = [], max = 0, min = -1, step = 0;
    	
    	response.data.customers_by_state.forEach(function(item, index){
    		var val = item.totalCustomers;
    		max = (val > max)?val : max;
    		min = (min < 0 || min > val)? val : min;
    	});
    	
    	step = (max-min) / 6;

    	response.data.customers_by_state.forEach(function(item, index){
    		var color = getColor(item.totalCustomers, min, max, step);
    		areas.push({ title: item.name, color: color, id: item.abbreviation, customData: item.totalCustomers });

    	});
    	
	    AmCharts.makeChart('amChartMap2', {
	      type: 'map',
	      theme: 'blur',
	      zoomControl: { zoomControlEnabled: false, panControlEnabled: false },
	
	      dataProvider: {
	        map: 'usaLow',
	        zoomLevel: 1,
	        zoomLongitude: 10,
	        zoomLatitude: 52,
	        areas: areas
	      },
	
	      areasSettings: {
	        rollOverOutlineColor: layoutColors.border,
	        rollOverColor: layoutColors.primaryDark,
	        alpha: 0.8,
	        unlistedAreasAlpha: 0.2,
	        unlistedAreasColor: layoutColors.defaultText,
	        balloonText: '[[title]]: [[customData]] customers'
	      },
	      export: {
	        enabled: true
	      },
	      creditsPosition: 'bottom-right',
	      pathToImages: layoutPaths.images.amChart
	    });
	    
	    //Average age by state
	    var areasState = [],maxState = 0, minState = -1, stepState = 0;
    	
	    response.data.average_age_by_state.forEach(function(item, index){
    		var val = item.age;
    		maxState = (val > maxState)?val : maxState;
    		minState = (minState < 0 || minState > val)? val : minState;
    	});
    	
    	stepState = (maxState-minState) / 6;

    	response.data.average_age_by_state.forEach(function(item, index){
    		var color = getColor(item.age, minState, maxState, stepState);
    		areasState.push({ title: item.name, color: color, id: item.abbreviaton, customData: parseFloat(item.age).toFixed(2) });
    	});
    	
	    AmCharts.makeChart('amChartMap', {
	      type: 'map',
	      theme: 'blur',
	      zoomControl: { zoomControlEnabled: false, panControlEnabled: false },
	
	      dataProvider: {
	        map: 'usaLow',
	        zoomLevel: 1,
	        zoomLongitude: 10,
	        zoomLatitude: 52,
	        areas: areasState
	      },
	
	      areasSettings: {
	        rollOverOutlineColor: layoutColors.border,
	        rollOverColor: layoutColors.primaryDark,
	        alpha: 0.8,
	        unlistedAreasAlpha: 0.2,
	        unlistedAreasColor: layoutColors.defaultText,
	        balloonText: '[[title]]: [[customData]] average age'
	      },
	      export: {
	        enabled: true
	      },
	      creditsPosition: 'bottom-right',
	      pathToImages: layoutPaths.images.amChart
	    });
	});
  }
})();