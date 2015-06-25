App.controller('allTicketController', ['$scope', '$http', function($scope, $http){

    $scope.tickets = [];
    $scope.allTickets = [];
    $scope.openTickets = [];
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
                $scope.allTickets=response.data;
                console.log("All Tickets", $scope.allTickets);
                $scope.openTickets = [];
                $scope.archivedTickets = [];
                $scope.closedTickets = [];

                for (var i=0; i<$scope.allTickets.length; i++) {
                    if ($scope.allTickets[i].tktStatus == 'Resolved') {
                        $scope.closedTickets.push($scope.allTickets[i]);
                    } else if ($scope.allTickets[i].tktStatus == 'Open'){
                        $scope.openTickets.push($scope.allTickets[i]);
                    }
                }
                $scope.viewtkt('Open');
            });
    };

    $scope.viewtkt = function(chgTktStatus) {
        $scope.tickets = [];
        if (chgTktStatus == 'All') {
            $scope.tickets = $scope.allTickets;
        } else if (chgTktStatus == 'Closed') {
            console.log("closedTickets: ", $scope.closedTickets);
            $scope.tickets = $scope.closedTickets;
        } else if (chgTktStatus == 'Open') {
            $scope.tickets = $scope.openTickets;
            console.log("openTickets: ", $scope.openTickets);
        }
    };

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