App.controller('headerController', ['$scope', '$http', '$location', function($scope, $http, $location) {
    console.log('headerController loaded');

    $scope.showUser = false;
    $scope.waitMsg = false;

    $http.get('/users/user').success(
        function (data) {
            console.log("User reponse: ", data);
            if (data == "false") {
                $scope.showLogin = true;
            } else {
                $scope.showUser = true;
                $scope.user = data.name.first + " " + data.name.last;
            }
            $scope.waitMsg = false;
        });

    $scope.showWaitMsg = function () {
        $scope.waitMsg = true;
    };

    $scope.logout = function () {
        $http.get('/users/logout').success(function (data) {
            $scope.showLogin = true;
            $scope.showUser = false;
            console.log(data + " has been logged out");
            $location.path('/home');
        });
    };
}]);