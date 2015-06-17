App.controller('ticketController', ["$scope", "$http", function($scope, $http){
        console.log("Controller Empty");

        $scope.ticket = {};
        $scope.user = {};

        $scope.createTicket = function(ticket) {
                console.log(ticket);
                $http.post('/ticket/createTicket', ticket).success(
                    function(data, status, headers, config) {
                            console.log("Ticket Created ", status);
                            $scope.ticket = {};
                    });
        };

        $http.get('/users/user').success(
            function(data) {
                    console.log("User response: ", data);
                    $scope.user = data;
                    $scope.ticket.email = $scope.user.email;
                    console.log("Email: ", $scope.user.email);
            }
        );

        $http.get('/api/getData').success(function(data){
            console.log("Data from API", data);
        });
}]);