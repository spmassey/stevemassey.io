'use strict';

define(function (require) {
    require('angular')
        .module('myApp.services', [])
        .service('VersionService', require('service/version.service'));
});