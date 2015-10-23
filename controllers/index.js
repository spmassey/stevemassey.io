var express = require('express'),
    router = express.Router();

router.use('/user', require('./user'));
router.use('/users', require('./users'));

router.get('/', function (req, res) {
    res.render('main', { title: 'SteveMassey.io' });
});

module.exports = router;