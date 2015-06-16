App.controller('registerController', ['$scope', '$http', function($scope, $http){

    $scope.newUser = {};

    $scope.createUser = function(newUser) {
        $http.post('/users/create', newUser).success(
            function(data, status, headers, config) {
                console.log("User Created ", status);
                $scope.newUser = {};
        });
    }

}]);