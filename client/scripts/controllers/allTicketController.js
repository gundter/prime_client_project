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
                        $scope.closeTickets.push(response.data[i]);
                    } else if (response.data[i].tktStatus == 'tktArchived') {
                        $scope.archivedTickets.push(response.data[i]);
                    }
                }
            });
    };

    $scope.viewtkt = function(chgTktStatus) {
            if (chgTktStatus == 'open') {
                $scope.tickets = $scope.allTickets;
            } else if (chgTktStatus == 'closed') {
                $scope.tickets = $scope.closedTickets;
            } else if (chgTktStatus == 'archived') {
                $scope.tickets = $scope.archivedTickets;
            }
    };

    $scope.viewtkt();

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