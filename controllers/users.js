var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    UsersApi = require('../api/users');

router.get('/', function (req, res) {
    UsersApi.get()
        .then(function (users) {
            res.send(users);
        }, function (err) {
            // TODO: write me
        });
});

module.exports = router;