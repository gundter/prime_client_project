var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var Users = require('../models/userSchema');
var Tickets = require('../models/ticketSchema');
var ticketNumber;


/////////////////////////
// Get the All Tickets
/////////////////////////
router.get('/getTickets', function (req, res, next) {
    // Check if the User is logged in
    if (req.isAuthenticated()) {
        // Check if User is SuperUser
        if (req.user.email == "batman@justiceleague.com"){
            Tickets.find({}, null, function(err, data){
                // Send back all Tickets
                res.send(data);
                console.log("found", data);
            });
        // Find a specific Users Tickets
        } else {
            Tickets.find({userID: req.user._id}, null, function(err, data){
               res.send(data);
            });
        }
    }

});


/////////////////////////
// Create a New Ticket
/////////////////////////



router.post('/createTicket', function(req, res, next) {
    if (req.isAuthenticated()){



            var ticket = {
                ticketNum: ticketNumber,
                problem: req.body.problem,
                email: req.body.email,
                browser: req.body.browser,
                description: req.body.description,
                iframe: req.body.iframe,
                name: req.user.name.first + " " + req.user.name.last,
                phone: req.user.phone,
                department: req.user.department,
                userID: req.user._id,
                tktStatus: "tktOpen"

            };
            Tickets.create(ticket, function (err, post) {
                if (err)
                    next(err);
                else
                    res.send('Success');
            });
        }
});

router.put('/updateStatus', function(req, res, next) {
    console.log(req.body, req.body.tktStatus)
    Tickets.findByIdAndUpdate(req.body._id, {tktStatus: req.body.tktStatus}, function (err, data) {
        if (err) return next(err);
        res.json(data);
    });
});

module.exports = router;
