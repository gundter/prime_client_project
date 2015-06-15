/**
 * Created by brianaamodt on 6/15/15.
 */

App.controller('calculatorController',['$scope', function($scope){
    var current = "";

    $scope.equal = function(){
        current = eval(current) + Math.PI;
        $scope.output = current;
    };

    $scope.opBtn = function(operator){
        current += operator;
        $scope.output = current;
    };

    $scope.numBtn = function(value){
        current += value;
        $scope.output = current;
    };

    $scope.clear = function(){
        current = "";
        $scope.output = current;
    };
}]);