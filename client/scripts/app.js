/**
 * Created by brianaamodt on 6/11/15.
 */
//myApp is enabling angular functionality within it's scope
var App = angular.module('App',['ngRoute', 'appControllers']);

var appControllers = angular.module('appControllers', []);

// myApp.config is enabling navigation between html pages
App.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider){
    $routeProvider.
        // directs to about/ home page
        when('/home', {
            templateUrl: "/views/about.html",
            controller: 'headerController'
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
        when('/register',{
            templateUrl: "/views/register.html",
            controller: 'registerController'
        }).
        when('/allTickets',{
            templateUrl: "/views/allTickets.html",
            controller: 'allTicketController'
        }).
        // defaults to about/ home page
        otherwise({
            redirectTo: "/home"
        });
}]);

App.service('browser', ['$window', function($window) {

    return function() {
        var userAgent = $window.navigator.userAgent;
        var browsers = {chrome: /chrome/i, safari: /safari/i, firefox: /firefox/i, ie: /internet explorer/i};

        for(var key in browsers) {
            if (browsers[key].test(userAgent)) {
                return key;
            }
        }
        return 'unknown';
    }
}]);