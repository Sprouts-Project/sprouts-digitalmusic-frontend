/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('DashboardMapCtrl', DashboardMapCtrl);

  /** @ngInject */
  function DashboardMapCtrl($http, baConfig, layoutPaths) {
    var layoutColors = baConfig.colors;
    $http.get('/dashboard/customer-overview').then(function(response) {
    	
    	var areas = [];
    	var max = 0;
    	var min = -1;
    	var step = 0;
    	response.data.average_age_by_state.forEach(function(item, index){
    		var val = item.age;
    		max = (val > max)?val : max;
    		min = (min < 0 || min > val)? val : min;
    	});
    	
    	step = (max-min) / 6;

    	response.data.average_age_by_state.forEach(function(item, index){
    		var color = '#4169E1';
    		if(item.age < (min+step)){
    			color = '#E0FFFF';
    		}else if(item.age < (min+2*step)){
    			color = '#B0E0E6';
    		}else if(item.age < (min+3*step)){
    			color = '#ADD8E6';
    		}else if(item.age < (min+4*step)){
    			color = '#87CEFA';
    		}else if(item.age < (min+5*step)){
    			color = '#6495ED';
    		}
    		areas.push({ title: item.name, color: color, id: item.abbreviaton, customData: parseFloat(item.age).toFixed(2) });
    	});
    	
	    var map = AmCharts.makeChart('amChartMap', {
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
	        balloonText: '[[title]]: [[customData]] average age'
	      },
	
	
	      legend: {
	        width: '100%',
	        marginRight: 27,
	        marginLeft: 27,
	        equalWidths: false,
	        backgroundAlpha: 0.3,
	        backgroundColor: layoutColors.border,
	        borderColor: layoutColors.border,
	        borderAlpha: 1,
	        top: 362,
	        left: 0,
	        horizontalGap: 10,
	        data: [
	          {
	            title: 'over 1 000 users',
	            color: layoutColors.primary
	          },
	          {
	            title: '500 - 1 000 users',
	            color: layoutColors.successLight
	          },
	          {
	            title: '100 - 500 users',
	            color: layoutColors.success
	          },
	          {
	            title: '0 - 100 users',
	            color: layoutColors.danger
	          }
	        ]
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