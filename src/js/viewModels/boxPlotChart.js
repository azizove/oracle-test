/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your customer ViewModel code goes here
 */
define([
  'ojs/ojcore',
  'knockout',
  'jquery',
  'ojs/ojknockout',
  'ojs/ojbutton',
  'ojs/ojchart',
  'ojs/ojtoolbar',
  'ojs/ojinputtext', 
  'ojs/ojlabel'
], function (oj, ko, $) {
  
  function ChartModel() {
    var self = this;

    /* chart data */
    var boxPlotSeries = [
      {name: "Series 1", items : [
        {low: 3, q1: 8, q2: 12, q3: 17, high: 28, items: [40, 50]},
        {low: 21, q1: 24, q2: 36, q3: 44, high: 65, items: [15]},
        {low: 7, q1: 16, q2: 23, q3: 32, high: 49},
        {low: 8, q1: 12, q2: 16, q3: 27, high: 49, items: [61]}
      ]},
      {name: "Series 2", items : [
        {low: 12, q1: 17, q2: 21, q3: 24, high: 35},
        {low: 5, q1: 14, q2: 24, q3: 31, high: 47},
        {low: 26, q1: 37, q2: 48, q3: 52, high: 71, items: [9, 12, 78]},
        {low: 10, q1: 14, q2: 37, q3: 50, high: 58}
      ]}
    ];
    var boxPlotGroups = ["Group A", "Group B", "Group C", "Group D"];

    self.boxPlotSeriesValue = ko.observableArray(boxPlotSeries);
    self.boxPlotGroupsValue = ko.observableArray(boxPlotGroups);
    
    /* toggle buttons */
    self.orientationValue = ko.observable('vertical');

    // var scatterSeries = [{name : "Series 1", items : [{x:15, y:15}, {x:25, y:43}, {x:25, y:25}]},
    // {name : "Series 2", items : [{x:25, y:15}, {x:55, y:45}, {x:57, y:47}]},
    // {name : "Series 3", items : [{x:17, y:36}, {x:32, y:52}, {x:26, y:28}]},
    // {name : "Series 4", items : [{x:38, y:22}, {x:43, y:43}, {x:58, y:36}]}];

    // var scatterGroups = ["Group A", "Group B", "Group C"];


    self.scatterSeriesValue = ko.observableArray([]);
    // self.scatterGroupsValue = ko.observableArray(scatterGroups);

    self.value = ko.observable("");
    self.getSeriesData = function(data) {
      var linesData = data.split("\\n")
      output = []
      linesData.forEach(function(currentValue, currentIndex) {
          var lineData = currentValue.split("\\t")
          if(currentIndex === 0) {
            lineData.forEach(function(value, index) {
              var seriesIndex = Math.trunc(index/2)
              if(!output[seriesIndex]) output[seriesIndex] = {}
              output[seriesIndex].items = []
              output[seriesIndex].name = (output[seriesIndex].name)? `${output[seriesIndex].name} ${value}`: value
            });
          } else {
            var point = {}
            lineData.forEach(function(value, index) {
              var seriesIndex = Math.trunc(index/2)
              if(index%2 === 0) {
                point = {}
                point.x = (value) ? value : 0
              } else {
                point.y = (value) ? value : 0
                output[seriesIndex].items.push(point)
              }
            });
          }
      })
      console.log(output)
      return output
    }
    self.buttonClick = function(event){
        self.scatterSeriesValue.removeAll();
        self.scatterSeriesValue.push(...self.getSeriesData(self.value()));
        return true;
    }
}

var chartModel = new ChartModel();

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return chartModel;
  }
);
