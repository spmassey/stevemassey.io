var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function (file) {
    if (TEST_REGEXP.test(file)) {
        // Normalize paths to RequireJS module names.
        // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
        // then do not normalize the paths
        var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
        allTestFiles.push(normalizedTestModule);
    }
});

require.config({
    // Karma serves files under /base, which is the basePath from your config file

    paths: {
        app: '/app',
        requirejs: 'bower_components/requirejs/require',
        jquery: 'bower_components/jquery/dist/jquery.min',
        bootstrap: 'bower_components/bootstrap/dist/js/bootstrap.min',
        angular: 'bower_components/angular/angular',
        angularRoute: 'bower_components/angular-route/angular-route',
        angularMocks: 'bower_components/angular-mocks/angular-mocks',
        angularWebsocket: 'bower_components/angular-websocket/angular-websocket',
        angularBootstrapTpls: 'bower_components/angular-bootstrap/ui-bootstrap-tpls.min',
        angularSanitize: 'bower_components/angular-sanitize/angular-sanitize.min',
        text: 'bower_components/requirejs-text/text',
        showdown: 'bower_components/showdown/src/showdown',
        featherlight: 'bower_components/featherlight/release/featherlight.min',
        featherlightgallery: 'bower_components/featherlight/release/featherlight.gallery.min'
    },

    shim: {
        'bootstrap': ['jquery'],
        'angular' : {
            'exports' : 'angular',
            deps: ['requirejs']
        },
        'angularRoute': ['angular'],
        'angularMocks': {
            deps: ['angular'],
            exports: 'angular.mock'
        },
        'angularWebsocket': ['angular'],
        'angularBootstrapTpls': ['angular'],
        'angularSanitize': ['angular'],
        'featherlight': ['jquery'],
        'featherlightgallery': ['featherlight']
    },

    priority: [
        "requirejs",
        "jquery",
        "angular"
    ],

    baseUrl: '/base',

    // dynamically load all test files
    deps: allTestFiles,

    // we have to kickoff jasmine, as it is asynchronous
    callback: window.__karma__.start
});
