var express = require('express');
var router = express.Router();
var https = require('https');
var formUrlEncoded = require('form-urlencoded');
var VideoData = require('../models/videoDataSchema');


//////////////////////////////
// Save Video Data to database
//////////////////////////////
router.post('/', function(req, res, next){
    console.log('Results: ', req.body);

    VideoData.create(req.body, function(err, data) {
       if (err) {
           console.log("Error with creating videoData: ", err);
        return next(err);
       }
       console.log("Callback Create Video Data: ", data);
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
    VideoData.findById(req.body.id,
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
    api_key: 'eTnp4mQvjFb5Xb92dYPADytLnSxQLl',
    api_key_type: 'user',
    service_name: 'Prime Digital Academy Team',
<<<<<<< HEAD
<<<<<<< HEAD
    video_endpoint: 'https://polar-reef-6279.herokuapp.com/api',
=======
    video_endpoint: 'https://guarded-wave-5600.herokuapp.com/api',
>>>>>>> 4ad6f2630f8eb934d93975c61477aba1ff94b188
=======
    video_endpoint: 'https://dry-everglades-2662.herokuapp.com/api',
    //video_endpoint: 'https://primedesk.herokuapp.com/api'
>>>>>>> d4233a72e752ef4ad735d1ad93ccf152f0ba37b3
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