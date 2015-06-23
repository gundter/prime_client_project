App.controller('registerController', ['$scope', '$http', '$location',function($scope, $http, $location){

    $scope.newUser = {};

    $scope.createUser = function(newUser) {
        $http.post('/users/create', newUser).success(
            function(data, status, headers, config) {
                console.log("User Created ", status);



                $http.post('/', newUser, newUser.email, newUser.password).success(
                    function(data){
                        console.log("User is logged in", data);
                        $scope.newUser = {};
                        $location.path('/home');
                    });
        });
    }



}]).directive('pwCheck',function () {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            var firstPassword = angular.element(document.getElementById(attrs.pwCheck));
            elem.on('keyup', function () {
                console.log("Retype password: ",elem.val());
                scope.$apply(function () {
                    console.log("first password: ",firstPassword.val());
                    console.log(elem.val() === firstPassword.val());
                    ctrl.$setValidity('pwMatch', elem.val() === firstPassword.val());
                });
            });
        }
    }
});