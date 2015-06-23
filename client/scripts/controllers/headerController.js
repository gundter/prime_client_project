App.controller('headerController', ['$scope', '$http', '$location', '$route', function($scope, $http, $location, $route){

    console.log('headerController loaded');

    $scope.reloadRoute = function(){
        console.log("Entering reloadRoute function");
        $route.reload();
    };

    $scope.reloadRoute();

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

}]);