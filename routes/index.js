var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

router.get("/", function(req,res,next){
  res.sendFile(path.resolve(__dirname, '../views/index.html'));
});

router.post('/',
    passport.authenticate('local'), function( req, res, next){
        console.log(req.user);
        res.send(req.user);
    });

/*router.post('/',
    function(req,res,next) {
      passport.authenticate('local', {
        successRedirect: '/users',
        failureRedirect: '/'
      })(req,res,next)
    }
);*/

console.log('index route loaded');
module.exports = router;