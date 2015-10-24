'use strict';
define([
    'angular',
    'showdown'
], function (angular) {

    var mdconverter = new Showdown.converter();

    var ProjectsCtrl = [
        '$scope', '$http', 'projects',
        function ($scope, $http, projects) {
            $scope.projects = projects;

            $scope.notEmpty = function (item) {
                return item.name.length > 0;
            };

            angular.element(document).ready(function () {
                $('a.gallery').featherlightGallery({
                    openSpeed: 300
                });
            });
        }
    ];

    angular.module('myApp.projects', ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {

            $routeProvider.when('/projects', {
                title: 'Projects',
                templateUrl: 'projects/projects.html',
                controller: 'ProjectsCtrl',
                resolve: {
                    projects: ['$http', '$q', '$sce', function ($http, $q, $sce) {
                        var df = $q.defer();
                        $http.get('/projects/projects.json').success(function (data) {
                            for (var i = 0; i < data.length; ++i) {
                                data[i].description = $sce.trustAsHtml(mdconverter.makeHtml(data[i].description));
                            }
                            df.resolve(data);
                        });
                        return df.promise;
                    }]
                }
            });
        }])
        .controller('ProjectsCtrl', ProjectsCtrl);
});

