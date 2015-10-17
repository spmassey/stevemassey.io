'use strict';
define([
    'angular',
    'angularRoute',
], function (angular) {

    var UsersCtrl = [
        '$scope', '$uibModal', 'DataService',
        function ($scope, $uibModal, DataService) {
            $scope.readyState = false;
            $scope.users = [];

            DataService.users
                .get()
                .then(function (users) {
                    $scope.users = users;
                    $scope.readyState = true;
                });

            $scope.openAddUserModal = function () {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'addUserModal.html',
                    controller: 'AddUserModalCtrl',
                    size: 'md'
                });

                modalInstance.result.then(function (formData) {
                    console.log(formData);
                });
            };
        }
    ];

    var AddUserModalCtrl = [
        '$scope', '$modalInstance',
        function ($scope, $modalInstance) {
            $scope.formSubmitted = false;

            $scope.user = {
                name: '',
                username: '',
                password: ''
            };

            $scope.ok = function () {

                $modalInstance.close($scope.user);
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

            $scope.validate = function () {

            };

            $scope.formValid = function (property) {

            };
        }
    ];

    angular.module('myApp.users', ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/users', {
                templateUrl: 'users/users.html',
                controller: 'UsersCtrl'
            });
        }])
        .controller('UsersCtrl', UsersCtrl)
        .controller('AddUserModalCtrl', AddUserModalCtrl)
});

