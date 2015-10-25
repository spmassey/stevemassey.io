'use strict';

define(function (require) {
    require('angular')
        .module('myApp.controllers', ['myApp.services'])
        .controller('HeaderController', require('controller/header.controller'))
        .controller('AboutController', require('controller/about.controller'))
        .controller('ProjectsController', require('controller/projects.controller'))
        .controller('ContactController', require('controller/contact.controller'));
});