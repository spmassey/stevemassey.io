'use strict';

define(function (require) {
    require('angular')
        .module('myApp.filters', [])
        .filter('interpolate', require('filter/version.filter'));
});