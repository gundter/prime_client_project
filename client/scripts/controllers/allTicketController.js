App.controller('allTicketController', ['$scope', '$http', function($scope, $http){

    $scope.allTickets = [];
    $scope.ticket = {};
    $scope.users = [];
    $scope.userInfo = {};

    $http.get('/ticket/getTickets').then(
        function(response) {
            console.log("All Tickets", response);
            $scope.allTickets = response.data;
        });

    $http.get('/users/user').then(
        function(response) {
            console.log("User reponse: ", response);
                $scope.users = response.data;
        });

    $scope.ticketClass = function(status){
        $scope.tktStatus = status;
        console.log("allStats: ", $scope.tktStatus);
        console.log("UPDATE: ", status);
        return $http.put('/createTickets/'+ticket.tktStatus, status)
    };

}]);