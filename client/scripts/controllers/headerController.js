App.controller('headerController', ['$scope', '$http', function($scope, $http){

    console.log("Meow, headerController");
    $scope.showLogin = true;
    $scope.showUser = false;

    $http.get('/users/user').success(
        function(data) {
            console.log("User reponse: ", data);
            if (data == "false") {
                $scope.showLogin = true;
                $scope.showUser = false;
            } else {
                $scope.showUser = true;
                $scope.showLogin = false;
                $scope.usersname = data.user.name.first + " " + data.user.name.last;
            }
        });



    $scope.logout = function() {
        $http.get('/users/logout').success(function(data){
            $scope.showLogin = true;
            $scope.showUser = false;
            console.log(data + " has been logged out");
        });
    };



}]);