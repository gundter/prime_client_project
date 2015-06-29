var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var Users = require('../models/userSchema');
var Tickets = require('../models/ticketSchema');
var Videos = require('../models/videoDataSchema');


/////////////////////////
// Get the All Tickets
/////////////////////////
router.get('/getTickets', function (req, res, next) {
    // Check if the User is logged in
    if (req.isAuthenticated()) {
        // Check if User is SuperUser
        if (req.user.email == "batman@justiceleague.com" || req.user.email == "guest@email.com"){
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

        // Find size of Video Collection
        Videos.find({}, null, function(err, videoData) {
           var videoDataLen = videoData.length - 1;
            console.log("Size of Video Collection: ", videoDataLen);

            // Get a new Ticket Number
            Tickets.find({}, null, function (err, ticketData) {
                // length of ticket array
                var ticketNumber = ticketData.length + 1;
                console.log("Size of Ticket Collection: ", ticketData);
                console.log("Next Ticket Number: ", ticketNumber);

                // Build a New Ticket
                var ticket = {
                    ticketNum: ticketNumber,
                    problem: req.body.problem,
                    email: req.body.email,
                    browser: req.body.browser,
                    description: req.body.description,
                    name: req.user.name.first + " " + req.user.name.last,
                    phone: req.user.phone,
                    department: req.user.department,
                    userID: req.user._id,
                    token: videoData[videoDataLen].token,
                    randtag: videoData[videoDataLen].randtag,
                    videoURL: videoData[videoDataLen].videoURL,
                    embedURL: videoData[videoDataLen].embedURL,
                    iframe: videoData[videoDataLen].iframe,
                    tktStatus: "Open"
                };

                // Create a New Ticket
                Tickets.create(ticket, function (err, post) {
                    if (err)
                        next(err);
                    else
                        res.status('Success').send(post);
                });
            });
        });
    }
});

router.put('/updateStatus', function(req, res, next) {
    Tickets.findByIdAndUpdate(req.body._id, {tktStatus: req.body.tktStatus}, function (err, data) {
        if (err) return next(err);
        res.json(data);
    });
});

console.log('ticket route loaded');
module.exports = router;
