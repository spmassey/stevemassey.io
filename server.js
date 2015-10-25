var server = require('http').createServer();
var express = require('express');
var session = require('express-session');
var redis = require('redis');
var RedisClient = redis.createClient();
var RedisStore = require('connect-redis')(session);
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var url = require('url');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var FileStreamRotator = require('file-stream-rotator');
var fs = require('fs');
var morgan = require('morgan');
var logDirectory = __dirname + '/logs'

// ensure the logs dir is good
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

// create a rotating write stream
var accessLogStream = FileStreamRotator.getStream({
    filename: logDirectory + '/access-%DATE%.log',
    verbose: false
})

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}))

app.locals.moment = require('moment');

// inline middleware
app.use(function (req, res, next) {
    res.locals.dev = (req.get('host').indexOf('stevemassey.io') == -1);
    res.locals.dev = false;
    next();
});

// app config
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(flash());
app.use(session({
    store: new RedisStore({
        client: RedisClient
    }),
    secret: 'Winston_Churchill'
}));

// jade
app.set('views', './views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/app'));

// db
var port = process.env.PORT || 8080;

var dsn = 'mongodb://localhost/',
    db = 'SteveMasseyIo';

mongoose.connect(dsn + db, function (err, res) {
    if (err) {
        console.log('ERROR connecting to: ' + dsn + '. ' + err);
    } else {
        console.log('Succeeded connection to: ' + dsn);
    }
});

// controllers
app.use(require('./controllers'));

// listen
server.on('request', app);
server.listen(port, function () {
    console.log('Listening on ' + server.address().port)
});
