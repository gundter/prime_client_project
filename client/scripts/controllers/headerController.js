App.controller('headerController', ['$scope', '$http', '$location', '$route', function($scope, $http, $location, $route){
    console.log('headerController loaded');

    $scope.showUser = false;

    $http.get('/users/user').success(
        function(data) {
            console.log("User reponse: ", data);
            if (data == "false") {
                $scope.showLogin = true;
            } else {
                $scope.showUser = true;
                $scope.user = data.name.first + " " + data.name.last;
            }
        });

    $scope.logout = function() {
        $http.get('/users/logout').success(function(data){
            $scope.showLogin = true;
            $scope.showUser = false;
            console.log(data + " has been logged out");
            $location.path('/home');
        });
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

    $route.reload();

}]);