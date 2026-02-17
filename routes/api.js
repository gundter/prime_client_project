var express = require('express');
var router = express.Router();
var https = require('https');
var mongoose = require('mongoose');
var formUrlEncoded = require('form-urlencoded');
var VideoData = require('../models/videoDataSchema');


//////////////////////////////
// Save Video Data to database
//////////////////////////////
router.post('/', function(req, res, next){
    if (!req.isAuthenticated()) {
        return res.status(401).json({error: 'Unauthorized'});
    }

    // Sanitize iframe field: extract src URL and rebuild a clean iframe tag
    var iframeValue = '';
    if (req.body.iframe && typeof req.body.iframe === 'string') {
        // Extract the src URL using a simple, non-backtracking pattern
        var srcMatch = req.body.iframe.match(/src="(https:\/\/[^"]+)"/i);
        if (srcMatch && srcMatch[1]) {
            // Rebuild a clean iframe with only the src attribute - no regex on untrusted HTML
            var safeSrc = srcMatch[1].replace(/[<>"]/g, '');
            iframeValue = '<iframe src="' + safeSrc + '" frameborder="0"></iframe>';
        }
    }

    var videoData = {
        token: req.body.token,
        randtag: req.body.randtag,
        videoURL: req.body.videoURL,
        embedURL: req.body.embedURL,
        iframe: iframeValue
    };

    VideoData.create(videoData, function(err, data) {
       if (err) {
           console.log("Error with creating videoData: ", err);
        return next(err);
       }
       res.send(data);
    });
});

router.post('/nullify', function(req, res, next){
    var video = new VideoData({
        token: req.body.token,
        randtag: req.body.randtag,
        videoUrl: req.body.videoURL,
        embededURL: req.body.embededURL,
        iframe: req.body.iframe
    });
    // Validate id is a valid MongoDB ObjectId to prevent NoSQL injection
    var videoId = String(req.body.id || '');
    if (!mongoose.Types.ObjectId.isValid(videoId)) {
        return res.status(400).json({error: 'Invalid video ID'});
    }
    VideoData.findById(videoId,
        function(err, article){
            if (err){
                console.log("Find article failed", err);
                next(err)
            }
            try {
                videoDataSchema.push(video);
                videoDataSchema.save(function (err) {
                    if (err) return next(err);
                });
                res.send(video);
            }catch(exception){
                console.log("Push failed:", exception);
                next(err);
            }
        });
});
//////////////////////////////////
// Get the Video Recording Button
//////////////////////////////////
router.get('/getData', function(req, res, next){
    var results = new GetData();
    console.log('Data Created');
    results.go(function(data){
        res.json(data);
    })
});

function GetData(){
    if (!this instanceof GetData){
        return new GetData();
    }
}

var post_data = {
    //////////// Add You API KEY ////////////
    api_key: process.env.API_KEY,
    api_key_type: 'user',
    service_name: 'Prime Digital Academy Team',
    ///////////// Point to your Web Address //////////////
    video_endpoint: process.env.VIDEO_ENDPOINT,
    video_endpoint_extras: [],
    video_set_public: false
};

var post_data_string = formUrlEncoded.encode(post_data);

var post_options = {
    hostname: 'www.ilosvideos.com',
    path: '/api/auth/token',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': post_data_string.length
    }
};

GetData.prototype.go = function(callback){
    var request = https.request(post_options, function(response){
        console.log('STATUS: ' + response.statusCode);
        console.log('HEADERS: ' + JSON.stringify(response.headers));
        console.log('DATA:' + post_data_string);
        response.setEncoding('utf8');
        jsonObject = '';

        response.on('data', function(res){
            jsonObject += res;
            process.stdout.write(res);
            console.log("response.on runs");
        });

        response.on('end', function(){
            console.log('At response.end');
            jsonObject = JSON.parse(jsonObject);
            callback(jsonObject);
            console.log(jsonObject);
        });
    });

    request.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });
    request.write(post_data_string);
    request.end();
};

console.log('API route loaded');
module.exports = router;