App.controller('ticketController', ["$scope", "$http", '$sce', function($scope, $http, $sce){
        console.log("Controller Empty");

        $scope.ticket = {};
        $scope.user = {};
        $scope.returnedData = {};
        $scope.iframeButton = '';
        $scope.recordedVideo = {};
        $scope.iframeVideo = '';
        $scope.embedVideoURL = '';

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
            });

        $http.get('/api/getData').success(
            function(data) {
                    console.log(data);
                    $scope.returnedData = data;
                    $scope.iframe = $sce.trustAsHtml($scope.returnedData.recordButtonIframe);
        }).error(
            function(err) {
                    console.log(err);
        });

        $http.get('/videos').success(
            function(data) {
                    console.log(data);
                    $scope.recordedVideo = data;
                    $scope.iframeVideo = $sce.trustAsHtml($scope.recordedVideo.iframe);
                    $scope.embedVideoURL = $sce.trustAsHtml($scope.recordedVideo.embedURL);
        }).error(
            function(err) {
                console.log(err);
        });
}]);