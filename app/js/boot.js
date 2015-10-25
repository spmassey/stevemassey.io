'use strict';

require(
    [
        'angular',
        'angularRoute',
        'angularWebsocket',
        'angularBootstrapTpls',
        'angularSanitize',
        'jquery',
        'bootstrap',
        'showdown',
        'featherlight',
        'featherlightgallery',
        'app',
        'controllers',
        'services',
        'directives',
        'filters',
        'routes'
    ],
    function () {
        angular.bootstrap(document, ['myApp']);
    }
);