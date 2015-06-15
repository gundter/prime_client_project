/**
 * Created by brianaamodt on 6/15/15.
 */

//demonstrative calculator
App.controller('calculatorController',['$scope', function($scope){
//current is the up to date equation as entered by the user
    var current = "";
//scope.equal resolves the  equation and acts "broken" by adding pi to the result
    $scope.equal = function(){
        current = eval(current) + Math.PI;
        $scope.output = current;
    };
//scope.opBtn inserts an operator into the equation
    $scope.opBtn = function(operator){
        current += operator;
        $scope.output = current;
    };
//scope.numBtn inserts a number into the equation
    $scope.numBtn = function(value){
        current += value;
        $scope.output = current;
    };
//scope.clear clears out the equation
    $scope.clear = function(){
        current = "";
        $scope.output = current;
    };
}]);