App.controller('ticketController', ["$scope", "$http", '$sce', '$interval',function($scope, $http, $sce, $interval){
        console.log("ticketController loads");

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

        ////////////////////////
        // Get User information
        ///////////////////////
        $http.get('/users/user').success(
            function(data) {
                    console.log("User response: ", data);
                    $scope.user = data;
                    $scope.ticket.email = $scope.user.email;
                    console.log("Email: ", $scope.user.email);
            });

        //////////////////////////
        // Get ILOS Record Button
        //////////////////////////
        $http.get('/api/getData').success(
            function(data) {
                    console.log(data);
                    $scope.returnedData = data;
                    $scope.iframeButton = $sce.trustAsHtml($scope.returnedData.recordButtonIframe);
                    console.log("iframe button: ",$scope.iframeButton);

        }).error(
            function(err) {
                    console.log(err);
        });

        ////////////////////////////////////////
        // Get the Last Video that was Recorded
        ///////////////////////////////////////
        $interval(

            $http.get('/videos').success(
                function(data) {
                    var lastVideo = data.length - 1;
                    console.log("SetInterval Happens");
                    console.log("Video Data: ",data);
                    console.log("Video URL: ", data[lastVideo].videoURL);
                    $scope.recordedVideo = data;
                    $scope.iframeVideo = $sce.trustAsHtml($scope.recordedVideo[lastVideo].iframe);
                    $scope.embedVideoURL = $sce.trustAsHtml($scope.recordedVideo[lastVideo].embedURL);
                }).error(
                function(err) {
                    console.log(err);
                }), 5000);
}]);