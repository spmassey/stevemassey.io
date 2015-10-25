'use strict';

define(
    [
        'angular',
        'angularRoute',
        'angularMocks',
        'angularSanitize',
        'app',
        'controller/about.controller',
    ],
    function (angular, route, mocks) {

        describe('AboutController', function () {

            beforeEach(module('myApp'));

            it('should have 4 languages', inject(function ($controller) {
                var scope = {},
                    ctrl = $controller('AboutController', { $scope: scope });

                expect(scope.languages.length).toBeEqualTo(4);
            }));

        });

    }
);