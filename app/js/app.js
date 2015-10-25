'use strict';

define(['angular'], function () {
    var myApp = angular.module('myApp', [
        'ngRoute',
        'ngSanitize',
        'ui.bootstrap',
        'myApp.filters',
        'myApp.services',
        'myApp.directives',
        'myApp.controllers'
    ]);

    myApp.run(['$rootScope', function($rootScope) {
        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
            if (current && current.hasOwnProperty('$$route') && current.$$route.hasOwnProperty('title')) {
                $rootScope.title = current.$$route.title;
            }
        });
    }]);

    return myApp;
});
