App.controller('registerController', ['$scope', '$http', '$location', '$window',function($scope, $http, $location, $window){

    $scope.newUser = {};
    $scope.waitMsg = false;

    $scope.createUser = function(newUser) {
        $scope.waitMsg = true;
        $http.post('/users/create', newUser).success(
            function(data, status, headers, config) {
                console.log("User Created ", status);

                $http.post('/', {email: newUser.email, password: newUser.password}).then(
                    function(data, status){
                        console.log("User is logged in", status);
                        $scope.newUser = {};
                        $window.location.reload($location.path('/home'));
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