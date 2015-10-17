// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var server = require('http').createServer();
var express = require('express');        // call express
var app = express();                 // define our app using express
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({server: server, port: 4080});
var bodyParser = require('body-parser');
var path = require('path');
var url = require('url');
var mongoose = require('mongoose');
var schemas = require('./schemas');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

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

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/)
router.get('/', function (req, res) {
    res.json({message: "Welcome to the API"});
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

app.get('/', function (req, res) {
    res.sendfile(path.join(__dirname + "/app/index.html"));
});

app.get('/projects', function (req, res) {
    var Project = mongoose.model('Projects', schemas.Project);
    Project.find({})
        .exec(function (err, result) {
            if (err) {
                console.log('Error fetching projects:', err);
            } else {
                res.send(JSON.stringify(result, undefined, 2));
            }
        });
});

app.get('/add-project', function (req, res) {

    var Project = mongoose.model('Projects', schemas.Project);

    var project = new Project({
        name: 'Test',
        description: 'This is a test description',
        role: 'Author',
        began: new Date('2012-01-01')
    });

    project.save(function (err) {
        if (err) {
            console.log('error saving:', err);
        } else {
            console.log('success adding project', project._id);
        }
    });

    res.send('Ok: ' + project._id);
});

wss.on('connection', function connection(ws) {
    //var location = url.parse(ws.upgradeReq.url, true);
    ws.on('message', function incoming(message) {
        console.log('Received: %s', message);
        var payload = JSON.parse(message);
        var path = payload.path || '',
            action = payload.action || '';
        switch (path.replace(/^\/+/,'').replace(/\/+$/,'')) {
            case 'users':
                if ('' == action) {
                    var Users = mongoose.model('Users', schemas.User);
                    Users.find()
                        .exec(function (err, result) {
                            if (err) {
                                console.log('Error fetching users:', err);
                            } else {
                                ws.send(JSON.stringify({
                                    path: path,
                                    result: result
                                }));
                            }
                        });
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