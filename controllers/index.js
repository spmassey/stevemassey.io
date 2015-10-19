var express = require('express'),
    router = express.Router();

router.use('/user', require('./user'));
router.use('/users', require('./users'));

router.get('/', function (req, res) {
    res.sendfile(path.join(__dirname + "/app/index.html"));
});

module.exports = router;