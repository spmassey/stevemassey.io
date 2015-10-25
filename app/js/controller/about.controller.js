'use strict';

define(function () {
    return ['$scope', function ($scope) {
        $scope.technologies = [
            'Full Stack',
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
    }];
});