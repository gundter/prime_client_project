var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var Users = require('../models/userSchema');
var Tickets = require('../models/ticketSchema');


/////////////////////////
// Get the All Tickets
/////////////////////////
router.get('/user', function (req, res, next) {

    if (req.isAuthenticated()) {

        if (req.user.email == "batman@justiceleague.com"){
            Tickets.find({}, null, function(data){
                res.send(data);
            });
        }
    }


});

module.exports = router;
