'use strict';
define([
    'angular'
], function (angular) {

    var ContactCtrl = [
        '$scope',
        function ($scope) {
        }
    ];

    angular.module('myApp.contact', ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {

            $routeProvider.when('/contact', {
                title: 'Contact',
                templateUrl: 'contact/contact.html',
                controller: 'ContactCtrl'
            });
        }])
        .controller('ContactCtrl', ContactCtrl);
});

