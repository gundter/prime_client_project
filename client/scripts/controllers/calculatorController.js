/**
 * Created by brianaamodt on 6/15/15.
 */

App.controller('AboutCtrl',['$scope', function($scope){
    $scope.output = '0';
    $scope.newnumber = true;
    $scope.pendingOperation = null;
    $scope.operationToken = "";
    $scope.runningTotal = null;
    $scope.pendingValue = null;
    $scope.lastOperation = null;
    var ADD = "adding";
    var SUBTRACT = "subtracting";
    var ADD_TOKEN = "+";
    var SUBTRACT_TOKEN = "-";
    $scope.updateOutput = function(btn) {
        if($scope.output == "0" || $scope.newNumber) {
            $scope.output = btn;
            $scope.newNumber = false;
        } else {
            $scope.output += String(btn);
        }
        $scope.pendingValue = toNumber($scope.output);
    };
    $scope.add = function() {
        if($scope.pendingValue) {
            if($scope.runningTotal && $scope.pendingOperation == ADD ) {
                $scope.runningTotal += $scope.pendingValue;
            } else if($scope.runningTotal && $scope.pendingOperation == SUBTRACT ) {
                $scope.runningTotal -= $scope.pendingValue;
            }
            else {
                $scope.runningTotal = $scope.pendingValue;
            }
        }
        setOperationToken(ADD);
        setOutput(String($scope.runningTotal));
        $scope.pendingOperation = ADD;
        $scope.newNumber = true;
        $scope.pendingValue = null;
    };



}]);