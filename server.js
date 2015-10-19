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
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({server: server, port: 4080});
var bodyParser = require('body-parser');
var path = require('path');
var url = require('url');
var mongoose = require('mongoose');
var Q = require('q');
//var passport = require('./')

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
app.use(function (req, res, next) {
    if (!req.session) {
        return next(new Error('No session attached to request'));
    }
    if (!req.session.hasOwnProperty('views')) {
        req.session.views = 0;
    }
    ++req.session.views;
    console.log('SESSION VIEWS:', req.session.views);
    next();
});
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

wss.on('connection', function connection(ws) {
    //var location = url.parse(ws.upgradeReq.url, true);
    ws.on('message', function incoming(message) {
        console.log('Received: %s', message);
        var payload = JSON.parse(message);
        var path = payload.path || '',
            action = payload.action || '';
        switch (path.replace(/^\/+/, '').replace(/\/+$/, '')) {
            case('users'):
                switch (action) {
                    // GET all users
                    default:
                        UsersApi.get()
                            .then(function (users) {
                                ws.send(JSON.stringify({
                                    path: path,
                                    action: action,
                                    result: users
                                }));
                            }, function (err) {
                                // TODO: write me
                            });
                }
                break;
            case('user'):
                switch (action) {
                    case('add'):
                        UserApi.add(payload.data)
                            .then(function (newId) {
                                ws.send(JSON.stringify({
                                    path: path,
                                    action: action,
                                    result: newId
                                }));
                            }, function (err) {
                                // TODO: write me
                            });
                        break;
                    case('remove'):
                        UserApi.remove(payload.id)
                            .then(function () {
                                ws.send(JSON.stringify({
                                    path: path,
                                    action: action,
                                    result: payload.id
                                }));
                            }, function (err) {
                                // TODO: write me
                            });
                        break;
                    case('update'):
                        UserApi.save(payload.data.id, payload.data)
                            .then(function () {
                                ws.send(JSON.stringify({
                                    path: path,
                                    action: action,
                                    result: { uid: payload.id }
                                }));
                            }, function (err) {
                                // TODO: write me
                            });
                        break;
                    default:
                    // TODO: write me
                }
                break;
            default:
                ws.send(JSON.stringify({message: 'Hello!', time: Date.now()}));
        }

    });
});

// START THE SERVER
// =============================================================================
server.on('request', app);
server.listen(port, function () {
    console.log('Listening on ' + server.address().port)
});