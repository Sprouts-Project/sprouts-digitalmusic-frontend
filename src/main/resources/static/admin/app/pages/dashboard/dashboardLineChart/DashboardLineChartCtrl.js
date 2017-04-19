/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('DashboardLineChartCtrl', DashboardLineChartCtrl);

  /** @ngInject */
  function DashboardLineChartCtrl($http,orderByFilter, baConfig, layoutPaths, baUtil) {
    var layoutColors = baConfig.colors;
    var graphColor = baConfig.theme.blur ? '#000000' : layoutColors.primary;
    
    $http.get('/dashboard/finance-overview').then(function(response) {
    	
    	var chartData= [];
    	response.data.monthly_sales.forEach(function(item, index){
    		chartData.push({ date: new Date(item.year,item.month), value: parseFloat(item.value).toFixed(2) });
    	});
    	chartData = orderByFilter(chartData, 'date', false);
	  
    	var chart = AmCharts.makeChart("amchart", {
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
    	         "balloonText":"<div style='margin:10px; text-align:left;'><span style='font-size:13px'>[[category]]</span><br><span style='font-size:18px'>Monthly sale: [[value]]</span>",
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
    });
   
  }
})();