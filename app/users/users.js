'use strict';
define([
    'angular',
    'angularRoute',
], function (angular) {

    var UsersCtrl = [
        '$scope', '$q', '$uibModal', 'DataService',
        function ($scope, $q, $uibModal, DataService) {
            $scope.readyState = false;
            $scope.users = [];

            $scope.loadUsers = function () {
                console.log('loading users');
                $scope.readyState = false;
                DataService.users
                    .get()
                    .then(function (users) {
                        console.log('loaded users', users);
                        $scope.users = users;
                        $scope.readyState = true;
                    });
            };

            $scope.addUser = function (data) {
                var df = $q.defer();
                DataService.users
                    .add(data)
                    .then(function () {
                        df.resolve();
                    });
                return df.promise;
            };

            $scope.openAddUserModal = function () {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'addUserModal.html',
                    controller: 'AddUserModalCtrl',
                    size: 'md'
                });

                modalInstance.result.then(function (formData) {
                    $scope.addUser(formData)
                        .then($scope.loadUsers);
                });
            };

            $scope.confirmDeleteUser = function (user) {
                if (confirm('Are you sure?')) {
                    $scope.deleteUser(user)
                        .then($scope.loadUsers);
                }
            };

            $scope.deleteUser = function (user) {
                var df = $q.defer();
                DataService.users
                    .remove(user)
                    .then(function () {
                        df.resolve();
                    });
                return df.promise;
            };

            $scope.loadUsers();
        }
    ];

    var AddUserModalCtrl = [
        '$scope', '$modalInstance',
        function ($scope, $modalInstance) {
            $scope.processing = false;

            $scope.user = {
                name: {
                    value: '',
                    valid: null,
                    message: ''
                },
                username: {
                    value: '',
                    valid: null,
                    message: ''
                },
                password: {
                    value: '',
                    valid: null,
                    message: ''
                }
            };


            $scope.$watch('user.name.value', function () { $scope.user.name.valid = null; });
            $scope.$watch('user.username.value', function () { $scope.user.username.valid = null; });
            $scope.$watch('user.password.value', function () { $scope.user.password.valid = null; });

            $scope.ok = function () {
                // validate
                var valid = true;
                if (0 == $scope.user.name.value.length) {
                    valid = false;
                    $scope.user.name.message = 'Please enter a name';
                    $scope.user.name.valid = valid;
                }
                if (0 == $scope.user.username.value.length) {
                    valid = false;
                    $scope.user.username.message = 'Please enter a username';
                    $scope.user.username.valid = valid;
                }
                if (0 == $scope.user.password.value.length) {
                    valid = false;
                    $scope.user.password.message = 'Please enter a password';
                    $scope.user.password.valid = valid;
                } else if (null === $scope.user.password.value.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/)) {
                    valid = false;
                    $scope.user.password.message = 'The password must be at least 6 characters long, with at least 1 letter, number, and special character';
                    $scope.user.password.valid = valid;
                }

                if (valid) {
                    $scope.processing = true;
                    $modalInstance.close({
                        name: $scope.user.name.value,
                        username: $scope.user.username.value,
                        password: $scope.user.password.value
                    });
                }
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
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

