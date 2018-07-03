/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your incidents ViewModel code goes here
 */
define([
  'ojs/ojcore',
  'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojbutton', 'ojs/ojchart', 'ojs/ojtoolbar',
  'appController',
], function (oj, ko, $) {
  function ChartModel() {
    /* chart data */
    var scatterSeries = [{name : "Series 1", items : [{x:15, y:15}, {x:25, y:43}, {x:25, y:25}]},
    {name : "Series 2", items : [{x:25, y:15}, {x:55, y:45}, {x:57, y:47}]},
    {name : "Series 3", items : [{x:17, y:36}, {x:32, y:52}, {x:26, y:28}]},
    {name : "Series 4", items : [{x:38, y:22}, {x:43, y:43}, {x:58, y:36}]}];

    var scatterGroups = ["Group A", "Group B", "Group C"];


    this.scatterSeriesValue = ko.observableArray(scatterSeries);
    this.scatterGroupsValue = ko.observableArray(scatterGroups);
  }

  var chartModel = new ChartModel();

  // $(function () {
  //   ko.applyBindings(chartModel, document.getElementById('chart-container'));
  // });
  return chartModel
})