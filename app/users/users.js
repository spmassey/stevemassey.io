'use strict';
define([
    'angular',
    'angularRoute',
], function (angular) {

    var UsersCtrl = [
        '$scope', '$q', '$http', '$uibModal', 'DataService',
        function ($scope, $q, $http, $uibModal, DataService) {
            $scope.readyState = false;
            $scope.vehicle = 'http';
            $scope.users = [];
            $scope.responseTimes = {
                loadUsers: null
            };

            $scope.toggleVehicle = function () {
                $scope.vehicle = ($scope.vehicle == 'http' ? 'ws' : 'http');
            };

            $scope.loadUsers = function () {
                console.log('loading users');
                var start = performance.now(),
                    end;
                $scope.readyState = false;
                if ('http' == $scope.vehicle) {
                    $http.get('/users')
                        .success(function (users) {
                            console.log('loaded users', users);
                            $scope.users = users;
                            $scope.readyState = true;
                            end = performance.now();
                            $scope.responseTimes.loadUsers = ((end - start) / 1000).toFixed(4);
                        });
                } else {
                    DataService.users
                        .get()
                        .then(function (users) {
                            console.log('loaded users', users);
                            $scope.users = users;
                            $scope.readyState = true;
                            end = performance.now();
                            $scope.responseTimes.loadUsers = ((end - start) / 1000).toFixed(4);
                        });
                }
            };

            $scope.addUser = function (data) {
                var df = $q.defer();
                if ('http' == $scope.vehicle) {
                    $http.post('/user', data)
                        .success(function () {
                            df.resolve();
                        });
                } else {
                    DataService.users
                        .add(data)
                        .then(function () {
                            df.resolve();
                        });
                }
                return df.promise;
            };

            $scope.saveUser = function (data) {
                var df = $q.defer();
                if ('http' == $scope.vehicle) {
                    $http.put('/user/' + data.id, data)
                        .success(function () {
                            df.resolve();
                        });
                } else {
                    DataService.users
                        .save(data)
                        .then(function () {
                            df.resolve();
                        });
                }
                return df.promise;
            };

            $scope.openAddUserModal = function () {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'userModal.html',
                    controller: 'UserModalCtrl',
                    size: 'md'
                });

                modalInstance.result.then(function (formData) {
                    $scope.addUser(formData)
                        .then($scope.loadUsers);
                });
            };

            $scope.openEditUserModal = function (user) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'userModal.html',
                    controller: 'UserModalCtrl',
                    size: 'md',
                    resolve: {
                        user: function () {
                            return user;
                        }
                    }
                });

                modalInstance.result.then(function (formData) {
                    $scope.saveUser(formData)
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
                if ('http' == $scope.vehicle) {
                    $http.delete('/user/' + user._id)
                        .success(function () {
                            df.resolve();
                        });
                } else {
                    DataService.users
                        .remove(user)
                        .then(function () {
                            df.resolve();
                        });
                }
                return df.promise;
            };

            $scope.$watch('vehicle', function (newVal, oldVal) {
                console.log('loading with vehicle', $scope.vehicle);
                $scope.loadUsers();
            });
        }
    ];

    var UserModalCtrl = [
        '$scope', '$modalInstance', 'user',
        function ($scope, $modalInstance, user) {
            $scope.processing = false;

            $scope.user = {
                id: null,
                name: {
                    value: '',
                    valid: null,
                    message: ''
                },
                email: {
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
                },
                enabled: true,
                admin: false
            };

            if (user) {
                $scope.user.id = user._id;
                $scope.user.name.value = user.name;
                $scope.user.email.value = user.email;
                $scope.user.username.value = user.username;
                $scope.user.enabled = user.enabled;
                $scope.user.admin = user.admin;
            }

            $scope.$watch('user.name.value', function () { $scope.user.name.valid = null; });
            $scope.$watch('user.email.value', function () { $scope.user.email.valid = null; });
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
                if (0 == $scope.user.email.value.length || null === $scope.user.email.value.match(/@/)) {
                    valid = false;
                    $scope.user.email.message = 'Please enter a valid email address';
                    $scope.user.email.valid = valid;
                }
                if (0 == $scope.user.username.value.length) {
                    valid = false;
                    $scope.user.username.message = 'Please enter a username';
                    $scope.user.username.valid = valid;
                }
                if (null === $scope.user.id &&
                    (
                        0 == $scope.user.password.value.length
                            ||
                        null === $scope.user.password.value.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/)
                    )
                ) {
                    valid = false;
                    $scope.user.password.message = 'The password must be at least 6 characters long, with at least 1 letter, number, and special character';
                    $scope.user.password.valid = valid;
                }

                if (valid) {
                    $scope.processing = true;
                    $modalInstance.close({
                        id: $scope.user.id,
                        name: $scope.user.name.value,
                        email: $scope.user.email.value,
                        username: $scope.user.username.value,
                        password: $scope.user.password.value,
                        enabled: $scope.user.enabled,
                        admin: $scope.user.admin
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
        .controller('UserModalCtrl', UserModalCtrl)
});

