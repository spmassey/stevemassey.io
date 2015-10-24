'use strict';

define([
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
	'components/data-service/data-service',
    'projects/projects',
    'about/about',
    'contact/contact'
], function(angular) {

	// Declare app level module which depends on views, and components
	var myApp = angular.module('myApp', [
		'ngRoute',
		'ngWebSocket',
		'ui.bootstrap',
        'ngSanitize',
		'myApp.DataService',
        'myApp.projects',
        'myApp.about',
        'myApp.contact'
	]).
	config(['$routeProvider', function($routeProvider) {
		$routeProvider.otherwise({redirectTo: '/about'});
	}]);

    myApp.run(['$rootScope', function($rootScope) {
        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
            if (current.$$route.hasOwnProperty('title')) {
                $rootScope.title = current.$$route.title;
            }
        });
    }]);

    var HeaderCtrl = ['$scope', '$location', function ($scope, $location) {
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
    }];

    myApp.controller('HeaderCtrl', HeaderCtrl);



    return myApp;
});

