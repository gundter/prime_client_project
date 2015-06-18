var express = require('express');
var router = express.Router();
var https = require('https');
var formUrlEncoded = require('form-urlencoded');

router.get('/getData', function(req, res, next){
    var results = new GetData();
    console.log('Data Created');
    results.go(function(data){
        res.json(data);
    })
});

router.post('/', function(req, res, next){
    console.log('Results: ', req.body);
    res.send(req.body);
});

function GetData(){
    if (!this instanceof GetData){
        return new GetData();
    }
}

var post_data = {
    api_key: 'b6ANvns15XjOUeMbvyzVumTbgJ9stQ',
    api_key_type: 'org_guest_recorder',
    service_name: 'Prime Digital Academy Team',
    video_endpoint: 'https://dev.ilosvideos.com/embedApiTestEndpoint',
    video_endpoint_extras: [],
    video_set_public: true
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