'use strict';

define(function (require) {
    require('angular')
        .module('myApp.directives', [])
        .directive('appVersion', require('directive/version.directive'));
});