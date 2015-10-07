'use strict';

define([
	'angular',
	'angularRoute',
	'angularWebsocket',
	'components/data-service/data-service',
	'view1/view1',
	'view2/view2',
], function(angular) {
	// Declare app level module which depends on views, and components
	return angular.module('myApp', [
		'ngRoute',
		'ngWebSocket',
		'myApp.DataService',
		'myApp.view1',
		'myApp.view2'
	]).
	config(['$routeProvider', function($routeProvider) {
		$routeProvider.otherwise({redirectTo: '/view1'});
	}]);
});

