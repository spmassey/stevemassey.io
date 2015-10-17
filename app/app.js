'use strict';

define([
	'angular',
	'angularRoute',
	'angularWebsocket',
	'angularBootstrapTpls',
	'components/data-service/data-service',
	'users/users'
], function(angular) {
	// Declare app level module which depends on views, and components
	return angular.module('myApp', [
		'ngRoute',
		'ngWebSocket',
		'ui.bootstrap',
		'myApp.DataService',
		'myApp.users'
	]).
	config(['$routeProvider', function($routeProvider) {
		$routeProvider.otherwise({redirectTo: '/view1'});
	}]);
});

