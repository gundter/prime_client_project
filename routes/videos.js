var express = require('express');
var router = express.Router();
var Videos = require('../models/videoDataSchema');

router.get('/:token', function(req, res, next){
    Videos.find({token: req.params.token}, function(err, videos){
        if (err) return next(err);
        res.json(videos);
    });
});

console.log('videos route loaded');
module.exports = router;