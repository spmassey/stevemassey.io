'use strict';

define(
    [
        'angular',
        'angularRoute',
        'angularMocks',
        'angularSanitize',
        'angularBootstrapTpls',
        'myApp.filters',
        'myApp.services',
        'myApp.directives',
        'myApp.controllers',
        'myApp',
        'controller/about.controller',
    ],
    function (angular, route, mocks) {

        describe('AboutController', function () {

            var controller,
                scope = {};

            beforeEach(module('myApp'));

            beforeEach(inject(function ($controller) {
                controller = $controller('AboutController', { $scope: scope });
            }));

            it('should have 4 languages', function () {
                expect(scope.languages.length).toEqual(4);
            });

            it('should have 7 frameworks', function () {
                expect(scope.frameworks.length).toEqual(7);
            });

        });

    }
);