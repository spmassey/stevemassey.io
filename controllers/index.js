var express = require('express'),
    router = express.Router(),
    flash = require('connect-flash'),
    utils = require('../utils');

router.use('/user', require('./user'));
router.use('/users', require('./users'));

router.get('/', function (req, res) {
    res.render('main', { title: 'SteveMassey.io' });
});

router.get('/login', function (req, res) {
    res.render('login', { title: 'Login' });
});

//router.post('/login',
//    passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
//    function(req, res, next) {
//        // Issue a remember me cookie if the option was checked
//        if (!req.body.remember_me) { return next(); }
//
//        issueToken(req.user, function(err, token) {
//            if (err) { return next(err); }
//            res.cookie('remember_me', token, { path: '/', httpOnly: true, maxAge: 604800000 });
//            return next();
//        });
//    },
//    function(req, res) {
//        res.redirect('/');
//    });
//
//router.get('/logout', function(req, res){
//    // clear the remember me cookie when logging out
//    res.clearCookie('remember_me');
//    req.logout();
//    res.redirect('/');
//});

module.exports = router;