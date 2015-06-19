var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var session = require('express-session');
var User = require('./models/userSchema');

//////////////
//App Routes//
//////////////
var routes = require('./routes/index');
var users = require('./routes/users');
var ticket = require('./routes/ticket');
var API = require('./routes/api');
var videos = require('./routes/videos');

var app = express();

// Mongo setup
//var mongoURI = "mongodb://vincethebutcher:winteriscoming9@ds047652.mongolab.com:47652/primedesk";
var mongoURI = "mongodb://tgun6144:Docix016@ds045242.mongolab.com:45242/primedesk";
//var mongoURI = "mongodb://primedesk:vtkb@ds045242.mongolab.com:45242/primedesk";
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function (err) {
  console.log('mongodb connection error', err);
});

MongoDB.once('open', function () {
  console.log('mongodb connection open');
});

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'secret',
    key: 'user',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 600000, secure: false }
}));

app.use(express.static(path.join(__dirname, 'public')));

// Passport Stuff
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err,user){
        if(err) done(err);
        done(null,user);
    });
});

passport.use('local', new localStrategy({
        passReqToCallback : true,
        usernameField: 'username'
    },
    function(req, emailAddress, password, done){
        console.log("finding user...");
        User.findOne({ email: emailAddress }, function(err, user) {
            if (err) throw err;
            if (!user) {
                console.log("User doesn't exist");
                return done(null, false, {message: 'Incorrect Email and Password.'});}

            // test a matching password
            console.log("testing for email: "+ emailAddress + " password: "+ password);
            user.comparePassword(password, function(err, isMatch) {
                if (err) throw err;
                if(isMatch) {
                    console.log("Password matches for " + user.email + " isMatch " + isMatch);
                    return done(null, user);
                }
                else
                    console.log("Password doesn't match");
                done(null, false, { message: 'Incorrect Email and Password.' });
            });
        });
    }));

app.use('/', routes);
app.use('/users', users);
app.use('/ticket', ticket);
app.use('/api', API);
app.use('/videos', videos);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
});


module.exports = app;
