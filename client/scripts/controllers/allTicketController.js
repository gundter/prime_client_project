App.controller('allTicketController', ['$scope', '$http', function($scope, $http){

    $scope.allTickets = [];
    $scope.ticket = {};
    $scope.users = [];
    $scope.userInfo = {};

    $scope.getTickets();

    $scope.getTickets = function(){
        $http.get('/ticket/getTickets').then(
            function(response) {
                console.log("All Tickets", response);
                $scope.allTickets = response.data;
            });
    };


    $http.get('/users/user').then(
        function(response) {
            console.log("User reponse: ", response);
                $scope.users = response.data;
        });

    $scope.ticketClass = function(ticket, status){
        console.log("Ticket: ",ticket);
        console.log("Ticket Status: ",status);
        $scope.chgTktSts = {
            tktStatus: status,
            _id: ticket._id
        };
        return $http.put('/ticket/updateStatus/', $scope.chgTktSts).success(getTickets());
    };

}]);