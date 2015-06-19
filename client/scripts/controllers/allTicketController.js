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
        if (status == tktOpen){
            $scope.ticket.tktStatus = tktOpen
        }else if(status == tktClosed){
            $scope.ticket.tktStatus = tktClosed
        }else if(status == tktArchived){
            $scope.ticket.tktStatus = tktArchived
        }
        console.log("allStats: ", $scope.tktStatus);
        console.log("UPDATE: ", status);
        return $http.put('/createTickets/'+ticket.tktStatus, status)
    };

}]);