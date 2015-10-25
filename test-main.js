var tests = Object.keys(window.__karma__.files).filter(function (file) {
    return (/spec\.js$/).test(file);
}).map(function(file) {
    // create relative path from `baseUrl` for specs, without `.js`
    // i.e., instead of requiring `/base/test/appSpec.js`
    // we want to require `../test/appSpec` when the
    // baseUrl is `/base/src`
    return '../../' + file.replace(/^\/base\//, '').replace(/\.js$/, '');
});

console.log('tests', tests);

require.config({

    baseUrl: '/base/app/js',

    paths: {
        jquery: '/base/app/bower_components/jquery/dist/jquery.min',
        bootstrap: '/base/app/bower_components/bootstrap/dist/js/bootstrap.min',
        angular: '../bower_components/angular/angular',
        angularRoute: '../bower_components/angular-route/angular-route',
        angularMocks: '../bower_components/angular-mocks/angular-mocks',
        angularWebsocket: '/base/app/bower_components/angular-websocket/angular-websocket',
        angularBootstrapTpls: '/base/app/bower_components/angular-bootstrap/ui-bootstrap-tpls.min',
        angularSanitize: '../bower_components/angular-sanitize/angular-sanitize.min',
        text: '/base/app/bower_components/requirejs-text/text',
        showdown: '/base/app/bower_components/showdown/src/showdown',
        featherlight: '/base/app/bower_components/featherlight/release/featherlight.min',
        featherlightgallery: '/base/app/bower_components/featherlight/release/featherlight.gallery.min'
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
