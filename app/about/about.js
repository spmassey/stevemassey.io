'use strict';
define([
    'angular'
], function (angular) {

    var AboutCtrl = [
        '$scope',
        function ($scope) {
            $scope.technologies = [
                'REST',
                'SOAP',
                'AJAX',
                'JSON',
                'IndexedDB',
                'MySQL',
                'MongoDB',
                'Websockets',
                'Nodejs',
                'Propel (PDO)',
                'Grunt',
                'Smarty',
                'Twig',
                'Jade',
                'Handlebars',
                'Async'
            ];

            $scope.languages = [
                'JavaScript',
                'PHP',
                'Python',
                'Perl'
            ];

            $scope.frameworks = [
                'CakePHP',
                'Symfony',
                'Angularjs',
                'Emberjs',
                'jQuery',
                'Backbone',
                'Express'
            ];

        }
    ];

    angular.module('myApp.about', ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {

            $routeProvider.when('/about', {
                title: 'About',
                templateUrl: 'about/about.html',
                controller: 'AboutCtrl'
            });
        }])
        .controller('AboutCtrl', AboutCtrl);
});

