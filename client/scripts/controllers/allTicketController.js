App.controller('allTicketController', ['$scope', '$http', function($scope, $http){

    $scope.tickets = [];
    $scope.allTickets = [];
    $scope.archivedTickets = [];
    $scope.closedTickets = [];

    $scope.ticket = {};
    $scope.users = [];
    $scope.userInfo = {};

    $http.get('/users/admin').success(
        function(data) {
            console.log("All tickets page User response: ", data);
            $scope.admin = data;
        });

    $scope.getTickets = function() {
        $http.get('/ticket/getTickets').then(
            function(response) {
                console.log("All Tickets", response);

                for (var i=0; i<response.data; i++) {

                    $scope.allTickets.push(response.data[i]);

                    if (response.data[i].tktStatus == 'tktClosed') {
                        $scope.closedTickets.push(response.data[i]);
                    } else if (response.data[i].tktStatus == 'tktArchived') {
                        $scope.archivedTickets.push(response.data[i]);
                    }
                }
            });
    };

    $scope.viewtkt = function(chgTktStatus) {
        console.log("viewtkt happens");
            if (chgTktStatus == 1) {
                $scope.tickets = $scope.allTickets;
                console.log("alltickets: ",$scope.allTickets);
            } else if (chgTktStatus == 2) {
                $scope.tickets = $scope.closedTickets;
                console.log("alltickets: ",$scope.closedTickets);
            } else if (chgTktStatus == 3) {
                $scope.tickets = $scope.archivedTickets;
                console.log("alltickets: ",$scope.archivedTickets);
            }
    };

    $scope.viewtkt(1);

    $scope.ticketClass = function(ticket, status){
        console.log("Ticket: ",ticket);
        console.log("Ticket Status: ",status);
        $scope.chgTktSts = {
            tktStatus: status,
            _id: ticket._id
        };
        return $http.put('/ticket/updateStatus/', $scope.chgTktSts).success($scope.getTickets);
    };

    $scope.getTickets();
}]);