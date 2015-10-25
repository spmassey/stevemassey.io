var tests = Object.keys(window.__karma__.files).filter(function (file) {
    return (/spec\.js$/).test(file);
}).map(function(file) {
    // create relative path from `baseUrl` for specs, without `.js`
    // i.e., instead of requiring `/base/test/appSpec.js`
    // we want to require `../test/appSpec` when the
    // baseUrl is `/base/src`
    return '../../' + file.replace(/^\/base\//, '').replace(/\.js$/, '');
});

require.config({

    baseUrl: '/base/app/js',

    paths: {
        jquery: '../bower_components/jquery/dist/jquery.min',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap.min',
        angular: '../bower_components/angular/angular',
        angularRoute: '../bower_components/angular-route/angular-route',
        angularMocks: '../bower_components/angular-mocks/angular-mocks',
        angularWebsocket: '../bower_components/angular-websocket/angular-websocket',
        angularBootstrapTpls: '../bower_components/angular-bootstrap/ui-bootstrap-tpls.min',
        angularSanitize: '../bower_components/angular-sanitize/angular-sanitize.min',
        text: '../bower_components/requirejs-text/text',
        showdown: '../bower_components/showdown/src/showdown',
        featherlight: '../bower_components/featherlight/release/featherlight.min',
        featherlightgallery: '../bower_components/featherlight/release/featherlight.gallery.min',
        'myApp': 'app',
        'myApp.filters': 'filters',
        'myApp.services': 'services',
        'myApp.directives': 'directives',
        'myApp.controllers': 'controllers'
    },
    shim: {
        'bootstrap': ['jquery'],
        'angular': {
            'exports': 'angular'
        },
        'angularRoute': ['angular'],
        'angularMocks': {
            deps: ['angular']
        },
        'angularWebsocket': ['angular'],
        'angularBootstrapTpls': ['angular'],
        'angularSanitize': ['angular'],
        'featherlight': ['jquery'],
        'featherlightgallery': ['featherlight']
    },

    // dynamically load all test files
    deps: tests,

    // we have to kickoff jasmine, as it is asynchronous
    callback: window.__karma__.start
});
