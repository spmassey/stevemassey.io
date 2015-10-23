'use strict';

require.config({
	paths: {
		angular: 'bower_components/angular/angular',
		angularRoute: 'bower_components/angular-route/angular-route',
		angularMocks: 'bower_components/angular-mocks/angular-mocks',
		angularWebsocket: 'bower_components/angular-websocket/angular-websocket',
		angularBootstrapTpls: 'bower_components/angular-bootstrap/ui-bootstrap-tpls.min',
		text: 'bower_components/requirejs-text/text'
	},
	shim: {
		'angular' : {'exports' : 'angular'},
		'angularRoute': ['angular'],
		'angularMocks': {
			deps: ['angular'],
			exports: 'angular.mock'
		},
		'angularWebsocket': ['angular'],
		'angularBootstrapTpls': ['angular'],
	},
	priority: [
		"angular"
	],
	baseUrl: '/'
});

require([
	'angular',
	'app'
	], function(angular, app) {
		var $html = angular.element(document.getElementsByTagName('html')[0]);
		angular.element().ready(function() {
			// bootstrap the app manually
			angular.bootstrap(document, ['myApp']);
		});
	}
);