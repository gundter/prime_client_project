var express = require('express');
var router = express.Router();
var Videos = require('../models/videoDataSchema');

router.get('/', function(req, res, next){
    Videos.find(function(err, videos){
        res.json(videos);
    })
});

console.log('videos route loaded');
module.exports = router;