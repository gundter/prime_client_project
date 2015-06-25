App.controller('ticketController', ["$scope", "$http", '$sce', '$interval', '$location',function($scope, $http, $sce, $interval, $location){

        $scope.ticket = {};
        $scope.user = {};
        $scope.returnedData = {};
        $scope.iframeButton = '';
        $scope.recordedVideo = {};
        $scope.iframeVideo = '';
        $scope.embedVideoURL = '';
        $scope.token = '';

        $scope.ticket.browser = navigator.userAgent;
        console.log("userInfo: ", navigator.userInfo);
        console.log("userAgent: ", navigator.userAgent);
        console.log(navigator);


        /////////////////////////
        // Create a New Ticket
        ////////////////////////
        $scope.createTicket = function(ticket) {
                console.log(ticket);
                $http.post('/ticket/createTicket', ticket).success(
                    function(data, status, headers, config) {
                            console.log("Ticket Created ", status);
                    });
            $scope.ticket = {};
            $location.path('/allTickets');
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
                    $scope.token = $scope.returnedData.token;
                    console.log("iframe button: ",$scope.iframeButton);

        }).error(
            function(err) {
                    console.log(err);
        });

        ////////////////////////////////////////
        // Get the Last Video that was Recorded
        ///////////////////////////////////////
        $scope.getVideo = function(){
            $interval(function() {

                $http.get('/videos/' + $scope.token).success(
                    function (data) {
                        var lastVideo = data.length - 1;
                        console.log("SetInterval Happens");
                        console.log("Video Data: ", data);
                        console.log("Video URL: ", data[lastVideo].videoURL);
                        $scope.recordedVideo = data;
                        $scope.iframeVideo = $sce.trustAsHtml($scope.recordedVideo[lastVideo].iframe);
                        $scope.embedVideoURL = $sce.trustAsHtml($scope.recordedVideo[lastVideo].embedURL);
                        $scope.token === data[0].token ? $scope.matchToken = true : $scope.matchToken = false;
                    }).error(
                    function (err) {
                        console.log(err);
                    })
            }, 5000);
        };

        $scope.getVideo();

        ///////////////////////////////////////////////////////////////////////////////////////
        //// Make the 'video' and 'embed URL' buttons visible when there is a video present. //
        ///////////////////////////////////////////////////////////////////////////////////////
        //
        //$scope.toggleButtons = function(){
        //  //if ($scope.recordedVideo[lastVideo].token == $scope.returnedData.token){
        //    if (2 == 2) {
        //       return $scope.showValue = true;
        //    } else {
        //       return $scope.showValue = false;
        //    }
        //};
}]);