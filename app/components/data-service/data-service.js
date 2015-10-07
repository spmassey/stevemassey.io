'use strict';

define(['angular'], function (angular) {
    angular.module('myApp.DataService', [
        'ngWebSocket'
    ]).factory('DataService',
        function ($websocket) {
            var dataStream = $websocket('ws://192.168.1.146:4080/');
            var collection = [];

            dataStream.onMessage(function (message) {
                collection.push(JSON.parse(message.data));
            });

            var api = {
                collection: collection,
                get: function () {
                    dataStream.send(JSON.stringify({ action: 'get' }))
                }
            };

            return api;
        });
});