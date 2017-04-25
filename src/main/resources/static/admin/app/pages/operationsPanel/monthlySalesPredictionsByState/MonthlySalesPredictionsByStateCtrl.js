/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.operationsPanel')
      .controller('MonthlySalesPredictionsByStateCtrl', MonthlySalesPredictionsByStateCtrl);

  /** @ngInject */
  function MonthlySalesPredictionsByStateCtrl($scope, $http, orderByFilter, baConfig, layoutPaths) {
	  
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
	  
	  // Chart states
	  function setChartOverviewFinanceMap(areas){
		  var map = AmCharts.makeChart('overviewFinanceMap', {
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
		        balloonText: '[[title]]: [[customData]] monthly sale'
		      },
		      export: {
		        enabled: true
		      },
		      creditsPosition: 'bottom-right',
		      pathToImages: layoutPaths.images.amChart
		    });
	  }
	  
    var layoutColors = baConfig.colors;
    
    $http.get('/dashboard/sales-predictions-by-state').then(function(response) {
    	
    	// Month sales by state
    	
    	var dataArr = response.data

		var month = 1;
		var year = 2018;

		var options = [];
		for (var i = 0; i < dataArr.length; i++) {
			
			var statesSales = dataArr[i].statesSales;
			
			var areas = [], max = 0, min = -1, step = 0;
			statesSales.forEach(function(item, index){
	    		var val = item.sales;
	    		max = (val > max)?val : max;
	    		min = (min < 0 || min > val)? val : min;
	    	});
	    	
	    	step = (max-min) / 6;

	    	statesSales.forEach(function(item, index){
	    		var color = getColor(item.sales, min, max, step);
	    		areas.push({ title: item.state, color: color, id: item.abbreviation, customData: parseFloat(item.sales).toFixed(2) });

	    	});
			
			options.push({
				name : dataArr[i].month + "/" + dataArr[i].year,
				month : dataArr[i].month,
				year : dataArr[i].year,
				salesStates : areas
			});
		}
		
		$scope.dropDownFinanceOptions = options.sort(function(a, b) {
			return new Date(a.year, a.month, 1)
					- new Date(b.year, b.month, 1);
		});

		$scope.selectedFinanceOption = options[0];
		
		setChartOverviewFinanceMap(options[0].salesStates);
		
		$scope.updateFinance = function() {
			var data = $scope.selectedFinanceOption.salesStates;
			setChartOverviewFinanceMap(data)
		}
    });
  }
})();