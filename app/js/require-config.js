'use strict';

require.config({
	paths: {
        requirejs: '../bower_components/requirejs/require',
        jquery: '../bower_components/jquery/dist/jquery.min',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap.min',
		angular: '../bower_components/angular/angular',
		angularRoute: '../bower_components/angular-route/angular-route',
		angularMocks: '../bower_components/angular-mocks/angular-mocks',
		angularBootstrapTpls: '../bower_components/angular-bootstrap/ui-bootstrap-tpls.min',
        angularSanitize: '../bower_components/angular-sanitize/angular-sanitize.min',
		text: '../bower_components/requirejs-text/text',
        showdown: '../bower_components/showdown/src/showdown',
        featherlight: '../bower_components/featherlight/release/featherlight.min',
        featherlightgallery: '../bower_components/featherlight/release/featherlight.gallery.min'
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
	baseUrl: './js'
});
