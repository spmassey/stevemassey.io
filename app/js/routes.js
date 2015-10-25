'use strict';

define(['app'], function (app) {
    return app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/about', {
            title: 'About',
            templateUrl: 'partials/about.html',
            controller: 'AboutController'
        });
        $routeProvider.when('/projects', {
            title: 'Projects',
            templateUrl: 'partials/projects.html',
            controller: 'ProjectsController'
            //resolve: {
            //    projects: ['$http', '$q', '$sce', function ($http, $q, $sce) {
            //        var df = $q.defer();
            //        $http.get('/projects/projects.json').success(function (data) {
            //            for (var i = 0; i < data.length; ++i) {
            //                data[i].description = $sce.trustAsHtml(mdconverter.makeHtml(data[i].description));
            //            }
            //            df.resolve(data);
            //        });
            //        return df.promise;
            //    }]
            //}
        });
        $routeProvider.when('/contact', {
            title: 'Contact',
            templateUrl: 'partials/contact.html',
            controller: 'ContactController'
        });
        $routeProvider.otherwise({redirectTo: '/about'});
    }]);
});