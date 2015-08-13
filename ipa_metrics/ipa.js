angular.module('devMetricsCalc', [])
  .controller('DMCCtrl', function($scope) {
    var unitManMonth = "man month";
    var unitSLOC = "SLOC";

    $scope.whitePaperData = [
      {index:1, type:"新規開発", lang:"C", a:0.91, b: 0.86, r:0.86},
      {index:2, type:"新規開発", lang:"COBOL", a:0.53, b:0.91, r:0.9},
      {index:3, type:"新規開発", lang:"VB", a:2.51, b:0.76, r:0.84},
      {index:4, type:"新規開発", lang:"Java", a:1.18, b:0.83, r:0.82},
      {index:5, type:"改良開発", lang:"C", a:77.62, b:0.44, r:0.66},
      {index:6, type:"改良開発", lang:"COBOL", a:6.91, b:0.71, r:0.79},
      {index:7, type:"改良開発", lang:"VB", a:37.56, b:0.5, r:0.78},
      {index:8, type:"改良開発", lang:"Java", a:10.35, b:0.64, r:0.76},
    ];
    this.selectedDevType = "1";
    this.calcType = "toSLOC";
    this.sourceNum = 0;
    this.sourceUnit = unitManMonth;
    this.resultUnit = unitSLOC;

    this.hilightRow = function(data) {
      if (this.selectedDevType == data.index) {
        return "info";
      }
      return "";
    };

    this.calcTypeChange = function() {
      if (this.calcType === "toSLOC") {
        this.sourceUnit = unitManMonth;
        this.resultUnit = unitSLOC;
      } else if (this.calcType === "toProductionCosts") {
        this.sourceUnit = unitSLOC;
        this.resultUnit = unitManMonth;
      }
    };

    this.calculate = function() {
      var data = this.getSelectedData();
      if (!data || !this.calcType) return "";

      var result = 0;
      if (this.calcType === "toSLOC") {
        var manMonth = this.sourceNum;
        var manHour = manMonth * 20 * 8;
        result = (Math.pow(manHour, (1 / data.b))) / data.a;

      } else if (this.calcType === "toProductionCosts") {
        var manHour = data.a * Math.pow(this.sourceNum, data.b);
        result = manHour / 20 / 8;

      }
      return parseInt(result).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
    };

    this.getSelectedData = function() {
      var target = this.selectedDevType;
      var result = null;
      $.each($scope.whitePaperData, function(i, data) {
        if (target == data.index) {
          result = data;
          return true;
        }
      });
      return result;
    };
  });
