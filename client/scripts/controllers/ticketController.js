App.controller('ticketController', ["$scope", "$http", '$sce', '$interval', '$location', 'browser',function($scope, $http, $sce, $interval, $location, browser){

    $scope.ticket = {};
    $scope.user = {};
    $scope.returnedData = {};
    $scope.iframeButton = '';
    $scope.recordedVideo = {};
    $scope.iframeVideo = '';
    $scope.embedVideoURL = '';
    $scope.token = '';
    $scope.clicked = true;

    // Sanitize HTML to only allow safe iframe tags, stripping scripts and event handlers
    function sanitizeIframeHtml(html) {
        if (!html || typeof html !== 'string') return '';
        // Use DOMParser instead of innerHTML to avoid executing scripts during parsing
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, 'text/html');
        var iframes = doc.querySelectorAll('iframe');
        var safeHtml = '';
        for (var i = 0; i < iframes.length; i++) {
            var src = iframes[i].getAttribute('src') || '';
            if (src.indexOf('https://') !== 0) continue;
            // Rebuild a clean iframe element with only safe attributes
            var safe = document.createElement('iframe');
            safe.setAttribute('src', src);
            if (iframes[i].getAttribute('width')) safe.setAttribute('width', iframes[i].getAttribute('width'));
            if (iframes[i].getAttribute('height')) safe.setAttribute('height', iframes[i].getAttribute('height'));
            if (iframes[i].getAttribute('frameborder')) safe.setAttribute('frameborder', iframes[i].getAttribute('frameborder'));
            safe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
            safeHtml += safe.outerHTML;
        }
        return safeHtml;
    }

    $scope.ticket.browser = browser();
    console.log("Broswer service: ", $scope.ticket.browser);

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
            $scope.iframeButton = $sce.trustAsHtml(sanitizeIframeHtml($scope.returnedData.recordButtonIframe));
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
                    $scope.iframeVideo = $sce.trustAsHtml(sanitizeIframeHtml($scope.recordedVideo[lastVideo].iframe));
                    $scope.token === data[0].token ? $scope.matchToken = true : $scope.matchToken = false;
                }).error(
                function (err) {
                    console.log(err);
                })
        }, 5000);
    };
    $scope.getVideo();
}]);