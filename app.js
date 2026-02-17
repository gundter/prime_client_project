var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var rateLimit = require('express-rate-limit');

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
    // Add your MongoLab Information
var mongoURI = process.env.MONGOLAB_URI;
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function (err) {
  console.log('mongodb connection error', err);
});

MongoDB.once('open', function () {
  console.log('mongodb connection open');
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex'),
    key: 'user',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 600000,
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'lax'
    }
}));

// Trust proxy in production (for secure cookies behind reverse proxy)
if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
}

// Rate limiting
var generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests, please try again later.' }
});

var authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many authentication attempts, please try again later.' }
});

app.use(generalLimiter);

// CSRF protection via double-submit cookie pattern (compatible with AngularJS)
// AngularJS $http automatically reads XSRF-TOKEN cookie and sends as X-XSRF-TOKEN header
app.use(function(req, res, next) {
    // Generate a CSRF token and set it as a cookie that AngularJS can read
    if (!req.cookies['XSRF-TOKEN']) {
        var csrfToken = crypto.randomBytes(32).toString('hex');
        res.cookie('XSRF-TOKEN', csrfToken, {
            httpOnly: false, // AngularJS needs to read this cookie
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        });
    }
    // For state-changing requests, validate the CSRF token
    // Exempt the login form POST (traditional form, not AJAX) - protected by authLimiter instead
    if (['POST', 'PUT', 'DELETE', 'PATCH'].indexOf(req.method) !== -1) {
        var isLoginForm = req.path === '/' && req.headers['content-type'] &&
            req.headers['content-type'].indexOf('application/x-www-form-urlencoded') !== -1 &&
            !req.headers['x-requested-with'];
        if (!isLoginForm) {
            var cookieToken = req.cookies['XSRF-TOKEN'];
            var headerToken = req.headers['x-xsrf-token'];
            if (!cookieToken || !headerToken || cookieToken !== headerToken) {
                return res.status(403).json({ error: 'CSRF token validation failed' });
            }
        }
    }
    next();
});

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
        usernameField: 'email'
    },
    function(req, emailAddress, password, done){
        console.log("finding user...");
        User.findOne({ email: emailAddress }, function(err, user) {
            if (err) throw err;
            if (!user) {
                console.log("User doesn't exist");
                return done(null, false, {message: 'Incorrect Email and Password.'});}

            // test a matching password
            user.comparePassword(password, function(err, isMatch) {
                if (err) throw err;
                if(isMatch) {
                    return done(null, user);
                }
                else
                    console.log("Password doesn't match");
                done(null, false, { message: 'Incorrect Email and Password.' });
            });
        });
    }));

app.use('/', authLimiter, routes);
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
