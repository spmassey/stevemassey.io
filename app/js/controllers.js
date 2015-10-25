'use strict';

define(function (require) {
    require('angular')
        .module('myApp.controllers', ['myApp.services'])
        .controller('HeaderController', require('controller/header'))
        .controller('AboutController', require('controller/about'))
        .controller('ProjectsController', require('controller/projects'))
        .controller('ContactController', require('controller/contact'));
});