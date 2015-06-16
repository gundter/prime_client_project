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

router.post('/createTicket', function(req, res, next) {

    res.send("Sucka!");

});

module.exports = router;
