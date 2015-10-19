var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    UserApi = require('../api/user');

router.post('/', function (req, res) {
    var payload = req.body;
    UserApi.add(payload)
        .then(function (newId) {
            res.send({
                uid: newId
            });
        }, function (err) {
            // TODO: write me
        });
});

router.put('/:id', function (req, res) {
    var payload = req.body;
    UserApi.save(req.params.id, payload)
        .then(function () {
            res.send({
                uid: req.params.id
            });
        }, function (err) {
            // TODO: write me
        });
});

router.delete('/:id', function (req, res) {
    UserApi.remove(req.params.id)
        .then(function () {
            res.send({
                uid: req.params.id
            });
        }, function (err) {
            // TODO: write me
        });
});

module.exports = router;