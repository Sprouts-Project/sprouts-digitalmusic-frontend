/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('OverviewStockCtrl', OverviewStockCtrl);

  /** @ngInject */
  function OverviewStockCtrl($scope, $http, orderByFilter, baConfig, layoutPaths, baUtil) {
    var layoutColors = baConfig.colors;
    var graphColor = baConfig.theme.blur ? '#000000' : layoutColors.primary;
    
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
    
    //Stock Chart
    $http.get('/dashboard/operation-overview').then(function(response) {
    	
    	var chartData= [];
    	response.data.monthly_sales.forEach(function(item, index){
    		chartData.push({ date: new Date(item.year,item.month), value: parseFloat(item.numProducts).toFixed(2) });
    	});
    	chartData = orderByFilter(chartData, 'date', false);
	  
    	var chart = AmCharts.makeChart("overviewStockChart", {
    	    "type": "serial",
    	    "theme": "light",
    	    "dataProvider": chartData,
    	    "valueAxes": [{
    	        "axisAlpha": 0,
    	        "dashLength": 4,
    	        "position": "left"
    	    }],
    	    "graphs": [{
    	        "bulletSize": 14,
    	        "valueField": "value",
    	         "balloonText":"<div style='margin:10px; text-align:left;'><span style='font-size:13px'>[[category]]</span><br><span style='font-size:18px'>Number of products: [[value]]</span>",
    	    }],
    	    "marginTop": 20,
    	    "marginRight": 70,
    	    "marginLeft": 40,
    	    "marginBottom": 20,
    	    "chartCursor": {
    	        "graphBulletSize": 1.5,
    	     	"zoomable":false,
    	      	"valueZoomable":true,
    	         "cursorAlpha":0,
    	         "valueLineEnabled":true,
    	         "valueLineBalloonEnabled":true,
    	         "valueLineAlpha":0.2
    	    },
    	    "autoMargins": false,
    	    "dataDateFormat": "YYYY-MM-DD",
    	    "categoryField": "date",
    	    "valueScrollbar":{
    	      "offset":30
    	    },
    	    "categoryAxis": {
    	        "parseDates": true,
    	        "axisAlpha": 0,
    	        "gridAlpha": 0,
    	        "inside": true,
    	        "tickLength": 0
    	    },
    	    "export": {
    	        "enabled": true
    	    }
    	});
    	
    	//Month sales
    	var areas = [], max = 0, min = -1, step = 0;
    	
    	response.data.monthly_sales_by_state.forEach(function(item, index){
    		var val = item.numProducts;
    		max = (val > max)?val : max;
    		min = (min < 0 || min > val)? val : min;
    	});
    	
    	step = (max-min) / 6;

    	response.data.monthly_sales_by_state.forEach(function(item, index){
    		var color = getColor(item.numProducts, min, max, step);
    		areas.push({ title: item.name, color: color, id: item.abbreviation, customData: parseFloat(item.numProducts).toFixed(2) });

    	});
    	
    	//Month sales by state
	    var map = AmCharts.makeChart('overviewStockMap', {
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
	    
	    //Table top product
	    var topProducts = [];
    	
    	response.data.top_products.forEach(function(item, index){
    		topProducts.push({ id: item.id, title: item.title, quantity: item.quantity });
    	});
    	
    	$scope.products = topProducts;
    });
   
  }
})();