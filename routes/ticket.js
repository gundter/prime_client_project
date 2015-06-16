var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var Users = require('../models/userSchema');
var Tickets = require('../models/ticketSchema');


/////////////////////////
// Get the All Tickets
/////////////////////////
router.get('/getTickets', function (req, res, next) {

    // Check if the User is logged in
    if (req.isAuthenticated()) {

        // Check if User is SuperUser
        if (req.user.email == "batman@justiceleague.com"){
            Tickets.find({}, null, function(data){
                // Send back all Tickets
                res.send(data);
            });
        // Find a specific Users Tickets
        } else {
            Tickets.find({userID: req.user._id}, null, function(data){
               res.send(data);
            });
        }
    }

});

/////////////////////////
// Create a New Ticket
/////////////////////////
router.post('/createTicket', function(req, res, next) {
    console.log("Request:", req.body);
    //if (req.isAuthenticated()) {
        console.log("Request Data: ", req.body);

        var ticket = {
            problem: req.body.problem,
            email: req.body.email,
            browser: req.body.browser,
            description: req.body.description,
            iframe: req.body.iframe,
            userID: req.user._id
        };
        console.log(ticket);
        Tickets.create(ticket, function (err, post) {
            console.log(ticket);
            if (err)
                next(err);
            else
                res.send('Success');
            console.log('Success', ticket);
        });
    //}

});

module.exports = router;
