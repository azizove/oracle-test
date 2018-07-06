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
  'ojs/ojlabel', 
  'promise'
], function (oj, ko, $) {
  function ChartModel() {
    var self = this
    /* Input  area initial data */
    self.value = ko.observable("")
    /* Scatter initial  data */
    self.scatterSeriesValue = ko.observableArray([])
    /* Bar initial  data */
    self.barSeriesValue = ko.observableArray([])
    /* Area initial data */
    this.areaSeriesValue = ko.observableArray([])
    /* Grid initial data */
    self.dataSource = ko.observable("");
    /** 
     * Data traitement
    */
    self.dataColumnsNames = []
    self.dataLines = []
    //convert to string input into data array
    self.formatData = function(data) {
      self.dataColumnsNames = []
      self.dataLines = []
      var dataLines = data.split("\\n")
      dataLines.forEach((line, index) => {
        if(index === 0) self.dataColumnsNames = line.split("\\t")
        else self.dataLines.push(line.split("\\t"))
      })      
    }
    //get data for scatter chart
    self.getScatterData = function () {
      var output = []
      self.dataColumnsNames.forEach(function (value, index) {
          var seriesIndex = Math.trunc(index / 2)
          if (!output[seriesIndex]) 
            output[seriesIndex] = {}
          output[seriesIndex].items = []
          output[seriesIndex].name = (output[seriesIndex].name)
            ? `${output[seriesIndex].name} ${value}`
            : value
      })
      {
        let point = {}
        self.dataLines.forEach(function (line) {
          line.forEach(function (value, index) {
            var seriesIndex = Math.trunc(index / 2)
            if (index % 2 === 0) {
              point = {}
              point.x = (value)? value : 0
            } else {
              point.y = (value)? value : 0
              output[seriesIndex].items.push(point)
            }
          })        
        })
      }
      return output
    }
    //get Area data
    self.getAreaData = function() {
      var output = []

      self.dataColumnsNames.forEach(function (value, index) {
        output[index] = {}
        output[index].items = []
        output[index].name = value
      })

      self.dataLines.forEach(function (line) {
        line.forEach(function (value, index) {
            output[index].items.push(value)
        })        
      })

      return output
    }
    //get Bar data
    self.getBarOrAreaData = function() {
      var output = []

      self.dataColumnsNames.forEach(function (value, index) {
        output[index] = {}
        output[index].items = []
        output[index].name = value
      })

      self.dataLines.forEach(function (line) {
        line.forEach(function (value, index) {
            output[index].items.push(value)
        })        
      })

      return output
    }

    //get Error data
    self.getErrorData = function(data) {
      var output = []
      self.dataLines.forEach(function(line) {
        if(line.length !== self.dataColumnsNames.length) output.push({ text : "Data doesn't much columns", value : line.toString()})
        if(line.some(isNaN)) output.push({ text : "Data content no numeric value", value : line.toString()})
      })
      return output       
    }
    self.formatObject = function(object) {
      var output = ""
      for (var property in object) {
        output += property + ': ' + object[property]+'; ';
      }
      return output
    }
    self.formatErrors = function(errors) {
      var output = ""
      errors.forEach(function(error) {
        output += self.formatObject(error) + "<br>"
      })
      return output
    }
    //button event
    self.buttonClick = function (event) {
      self.formatData(self.value())
      if(self.getErrorData(self.value()).length === 0) {
        self.scatterSeriesValue.removeAll()
        self.scatterSeriesValue.push(...self.getScatterData())

        var dataInput = self.getBarOrAreaData()

        self.areaSeriesValue.removeAll()
        self.areaSeriesValue.push(...dataInput)

        self.barSeriesValue.removeAll()
        self.barSeriesValue.push(...dataInput)
      }
      self.dataSource(self.formatErrors(self.getErrorData(self.value())))
      return true
    }
  }

  var chartModel = new ChartModel()
  return chartModel
})
