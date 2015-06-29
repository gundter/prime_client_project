var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var Users = require('../models/userSchema');

/////////////////////////
// Send Logged In page
/////////////////////////
router.get('/', function(req, res, next) {
  if (req.isAuthenticated()) {
      console.log("----------LOGGED IN----------");
      res.sendFile(path.resolve(__dirname, '../views/index.html'));
      //res.status(200);
  } else {
      console.log("----------NOT LOGGED IN----------");
    res.redirect('/');
  }
});

/////////////////////////
// Create User
/////////////////////////
router.post('/create', function(req,res,next) {
    Users.create(req.body, function (err, post) {
        if (err)
            next(err);
        else
            res.redirect('/');
    });
});

/////////////////////////
// Get the Logged in User
/////////////////////////

router.get('/user', function (req, res, next) {
  console.log("/user happens");
  if (req.isAuthenticated()) {
    console.log("Here is the request.user " + req.user.name.first + " " + req.user.name.last);

    var user = {
        _id: req.user._id,
        email: req.user.email,
        name: {first: req.user.name.first, last: req.user.name.last},
        phone: req.user.phone,
        department: req.user.department
    };

    res.send(user);
  } else {
    res.send("false");
  }
});

/////////////////////////
// Are you Batman?
////////////////////////
router.get('/admin', function (req, res, next) {
    console.log("/admin happens");
    console.log("Here is the request.user " + req.user.name.first + " " + req.user.name.last);

    var user = {
        _id: req.user._id,
        email: req.user.email,
        name: {first: req.user.name.first, last: req.user.name.last},
        phone: req.user.phone,
        department: req.user.department
    };

    var response;
    if (user.email == "batman@justiceleague.com" || user.email == "guest@email.com") {
        response = true;
    } else {
        response = false;
    }

    res.send(response);
});

////////////////////////


/////////////////////////
// Logout
/////////////////////////
router.get('/logout', function(req, res, next) {
  var user = req.user.name.first + " " + req.user.name.last;
  req.logout();
  res.send(user);
});

console.log('users route loaded');
module.exports = router;
