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

                for (var i=0; i<$scope.allTickets.length; i++) {
                    if ($scope.allTickets[i].tktStatus == 'tktClosed') {
                        $scope.closedTickets.push($scope.allTickets[i]);

                    } else if ($scope.allTickets[i].tktStatus == 'tktArchived') {
                        $scope.archivedTickets.push($scope.allTickets[i]);

                    } else if ($scope.allTickets[i].tktStatus == 'tktOpen'){
                        $scope.openTickets.push($scope.allTickets[i]);
                    }
                }
                $scope.viewtkt(1);
            });
    };

    $scope.viewtkt = function(chgTktStatus) {
            $scope.tickets = [];

            if (chgTktStatus == 1) {
                $scope.tickets = $scope.allTickets;

            } else if (chgTktStatus == 2) {
                console.log("closedTickets: ", $scope.closedTickets);
                $scope.tickets = $scope.closedTickets;

            } else if (chgTktStatus == 3) {
                $scope.tickets = $scope.archivedTickets;
                console.log("archivedTickets: ", $scope.archivedTickets);

            } else if (chgTktStatus == 4) {
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

    $scope.showHide = function(status){
        $scope.tktArchived.addClass(hide);
        if (status == 'tktArchived'){
            $scope.tktArchived.removeClass(hide);
        }
    };

    $scope.getTickets();
}]);