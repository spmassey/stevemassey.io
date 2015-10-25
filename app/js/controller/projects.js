'use strict';

define(function (require) {
    return ['$scope', '$http', '$sce',
        function ($scope, $http, $sce) {

            var Showdown = require('showdown');
            var mdconverter = new Showdown.converter();

            $scope.projects = [];

            $scope.init = function () {
                $http.get('/projects.json').success(function (data) {
                    for (var i = 0; i < data.length; ++i) {
                        data[i].description = $sce.trustAsHtml(mdconverter.makeHtml(data[i].description));
                    }
                    $scope.projects = data;
                });
            };

            $scope.notEmpty = function (item) {
                return item.name.length > 0;
            };

            angular.element(document).ready(function () {
                $('a.gallery').featherlightGallery({
                    openSpeed: 300
                });
            });

            $scope.init();
        }
    ];
});