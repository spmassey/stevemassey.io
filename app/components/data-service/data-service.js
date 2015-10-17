'use strict';

define(['angular'], function (angular) {
    angular.module('myApp.DataService', [
        'ngWebSocket'
    ]).factory('DataService',
        ['$websocket', '$q', function ($websocket, $q) {
            var dataStream = $websocket('ws://192.168.1.146:4080/');

            var users = {
                users: [],
                deferred: null,
                get: function () {
                    this.deferred = $q.defer();
                    dataStream.send(
                        JSON.stringify({
                            path: '/users',
                            action: ''
                        })
                    );
                    return this.deferred.promise;
                },
                reset: function () {
                    this.users = [];
                }
            };

            dataStream.onMessage(function (message) {
                var response = JSON.parse(message.data),
                    path = response.path || '';
                switch (path) {
                    case '/users':
                        users.reset();
                        for (var i = 0; i < response.result.length; ++i) {
                            users.users.push(response.result[i]);
                        }
                        users.deferred
                            .resolve(users.users);
                        break;
                }
            });

            var api = {
                users: users
            };

            return api;
        }]);
});