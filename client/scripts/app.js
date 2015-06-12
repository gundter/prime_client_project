/**
 * Created by brianaamodt on 6/11/15.
 */
    // myApp is enabling angular functionality within it's scope
var myApp = angular.module('myApp',['ngRouter', 'appControllers', 'ngAnimate']);

var appControllers = angular.module('appControllers', []);

// myApp.config is enabling navigation between html pages
myApp.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider){
    $routeProvider.
        // directs to about/ home page
        when('/home', {
            templateUrl: "/views/about.html",
            controller: 'aboutController'
        }).
        // directs to ticket page
        when('/ticket',{
            templateUrl: "/views/ticket.html",
            controller: 'ticketController'
        }).
        // directs to api instructions page
        when('/apiInstructions',{
            templateUrl: "/views/apiInstructions.html",
            controller: 'apiInstructionsController'
        }).
        // defaults to about/ home page
        otherwise({
            redirectTo: "/home"
        });
    }]);