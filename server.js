// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var server = require('http').createServer();
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ server: server, port: 4080 });
var bodyParser = require('body-parser');
var path = require('path');
var url = require('url');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/app'));

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/)
router.get('/', function(req, res) {
    res.json({ message: "Welcome to the API" });
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

app.get('/', function (req, res) {
    res.sendfile(path.join(__dirname + "/app/index.html"));
});

wss.on('connection', function connection (ws) {
    //var location = url.parse(ws.upgradeReq.url, true);
    console.log('connection!');
    ws.on('message', function incoming (message) {
        console.log('Received: %s', message);
    });

    ws.send(JSON.stringify({ message: 'Hello!', time: Date.now() }));
});

// START THE SERVER
// =============================================================================
server.on('request', app);
server.listen(port, function () { console.log('Listening on ' + server.address().port) });