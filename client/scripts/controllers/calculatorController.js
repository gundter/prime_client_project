/**
 * Created by brianaamodt on 6/15/15.
 */

//demonstrative calculator
App.controller('calculatorController',['$scope', '$route', function($scope, $route){

    $scope.reloadRoute = function(){
        console.log("Entering reloadRoute function");
        $route.reload('/home');
    };
//current is the up to date equation as entered by the user
    var current = "";
//key is set to the last button pressed so that each press is registered and appropriate parameters are met
    var key = "";
//scope.equal resolves the  equation and acts "broken" by adding pi to the result
    $scope.equal = function(){
        current = eval(current) + Math.PI;
        $scope.output = current;
        key = "equal";
    };
//scope.opBtn inserts an operator into the equation
    $scope.opBtn = function(operator){
        current += operator;
        $scope.output = current;
        key = operator;
    };
//scope.numBtn inserts a number into the equation
    $scope.numBtn = function(value){
        if(key == "equal"){
            current = value;
            $scope.output = current;
            key = value;
        }else{
            current += value;
            $scope.output = current;
            key = value;
        }
    };
//scope.clear clears out the equation
    $scope.clear = function(){
        current = "";
        $scope.output = current;
        key = "";
    };
}]);