// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var server = require('http').createServer();
var express = require('express');        // call express
var session = require('express-session');
var redis = require('redis');
var RedisClient = redis.createClient();
var RedisStore = require('connect-redis')(session);
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
var path = require('path');
var url = require('url');
var mongoose = require('mongoose');
var Q = require('q');
//var passport = require('./')

app.locals.moment = require('moment');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
    store: new RedisStore({
        client: RedisClient
    }),
    secret: 'Winston_Churchill'
}));
app.set('views', './views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/app'));


var port = process.env.PORT || 8080;        // set our port

var dsn = 'mongodb://localhost/',
    db = 'SteveMasseyIo';

mongoose.connect(dsn + db, function (err, res) {
    if (err) {
        console.log('ERROR connecting to: ' + dsn + '. ' + err);
    } else {
        console.log('Succeeded connection to: ' + dsn);
    }
});

app.use(require('./controllers'));

// START THE SERVER
// =============================================================================
server.on('request', app);
server.listen(port, function () {
    console.log('Listening on ' + server.address().port)
});