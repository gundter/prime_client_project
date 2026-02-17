var express = require('express');
var router = express.Router();
var Videos = require('../models/videoDataSchema');

router.get('/:token', function(req, res, next){
    // Ensure token is a plain string to prevent NoSQL injection
    var token = String(req.params.token || '');
    Videos.find({token: token}, function(err, videos){
        if (err) return next(err);
        res.json(videos);
    });
});

console.log('videos route loaded');
module.exports = router;