﻿//var app = angular.module('app', ['ngRoute', 'ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.selection', 'ui.bootstrap', 'oitozero.ngSweetAlert']);

angular
    .module('app')
    .controller('UserGridController', userGridController);

//app.controller('UserGridController', ['$scope', '$http', '$location', '$modal', 'uiGridConstants', 'userFactory', 'sweetAlert',
function userGridController($scope, $http, $location, $modal, uiGridConstants, userFactory) {

    $scope.data = userFactory;

    $scope.usersGrid = {
        enableHorizontalScrollbar: uiGridConstants.scrollbars.WHEN_NEEDED,
        enableVerticalScrollbar: uiGridConstants.scrollbars.WHEN_NEEDED,
        enableSorting: true,
        enableRowSelection: true,
        enableRowHeaderSelection: false,
        multiSelect: false,
        columnDefs: [
            { field: 'Id', visible: false },
            { field: 'UserName' },
            { field: 'Email' },
            { name: 'Commands', cellTemplate: '<button class="btn btn-sm btn-default" ng-click="grid.appScope.edit(row)">Edit</button>' +
                '<button class="btn btn-sm btn-default" ng-click="grid.appScope.delete(row)">Delete</button>' +
                '<button class="btn btn-sm btn-default" ng-click="grid.appScope.profiles(row)">Profiles</button>'
            }
        ],
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
        }
    };

    userFactory.getUsers()
        .then(function(users) {
                // success
                $scope.usersGrid.data = users;
            },
            function() {
                // error
                alert("Sorry, there was a problem loading users.  Please try again later.");
            });
      //.then(function () {
      //    $scope.isBusy = false;
      //});

    $scope.add = function () {
        var modalInstance = $modal.open({
            templateUrl: '/Templates/User/addUserModal.html',
            controller: AddUserModalController
        });
    };


    $scope.edit = function (row) {
        var modalInstance = $modal.open({
            templateUrl: '/Templates/User/editUserModal.html',
            controller: EditUserModalController,
            resolve: {
                user: function() {
                    return angular.copy(row.entity);
                }
            }
        });
    };

    $scope.profiles = function (row) {

        var user = angular.copy(row.entity);
        window.location = "/UserProfile/UserProfileIndex/" + user.Id;
    };

    //$scope.customNavigate = function (id) {
    //    $location.path("/UserProfiles/Index/" + id);
    //}


    //$scope.delete = function(row) {
        //resolve: {
        //    user: function () {
        //        return angular.copy(row.entity);
        //    }
        //}
        //var user = function () {
        //    return angular.copy(row.entity);
        //}

        //sweetAlert.swal({
        //            title: "Are you sure?",
        //            text: "Your will not be able to recover this user!",
        //            type: "warning",
        //            showCancelButton: true,
        //            confirmButtonColor: "#DD6B55",
        //            confirmButtonText: "Yes, delete user!",
        //            cancelButtonText: "No, cancel!",
        //            closeOnConfirm: false,
        //            closeOnCancel: false
        //        },
        //        function (isConfirm) {
        //            if (isConfirm) {
        //                userFactory.deleteUser(row.entity) //Concerned about this.
        //                    .then(function() {
        //                            // success
        //                            sweetAlert.swal("Deleted!", "User deleted.", "success");
        //                        },
        //                        function() {
        //                            // error
        //                            sweetAlert.swal("Error", "Unable to delete user!", "error");
        //                        });


        //            } else {
        //                sweetAlert.swal("Cancelled", "User not deleted", "error");
        //            }
        //        });
        //}


$scope.delete = function (row) {
        var modalInstance = $modal.open({
            templateUrl: '/Templates/User/deleteUserModal.html',
            controller: DeleteUserModalController,
            resolve: {
                user: function () {
                    return angular.copy(row.entity);
                }
            }
        });
    };

};

function AddUserModalController($scope, $modalInstance, userFactory) {

    $scope.ok = function(user) {

        userFactory.addUser(user)
            .then(function() {
                    // success
                    //$scope.gridOptions1.data = users;
                },
                function() {
                    // error
                    alert("could not save user");
                });

        $modalInstance.close();
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
};

function EditUserModalController($scope, $modalInstance, userFactory, user) {

    $scope.user = user;

    $scope.ok = function () {

        userFactory.editUser(user)
            .then(function () {
                // success
            },
                function () {
                    // error
                    alert("could not edit or update user");
                });

        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};

function DeleteUserModalController($scope, $modalInstance, userFactory, user) {

    $scope.user = user;

    $scope.ok = function () {

        userFactory.deleteUser(user)
            .then(function () {
                // success
                //$scope.gridOptions1.data = users;
            },
                function () {
                    // error
                    alert("could not delete user");
                });

        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};
/**
 * Pass function into module
 */
angular
    .module('app')
    .factory('userFactory', userFactory);

//app.factory("userFactory", ["$http", "$q", 
function userFactory($http, $q) {

    var _users = [];

    var _getUsers = function () {

        var deferred = $q.defer();

        $http.get('/api/Users')
          .then(function (result) {
              // Successful
              angular.copy(result.data, _users);
              deferred.resolve(_users);
          },
          function () {
              // Error
              deferred.reject();
          });

        return deferred.promise;
    };


    var _addUser = function (newUser) {

        var deferred = $q.defer();

        $http.post('/api/Users', newUser)
         .then(function (result) {
             // success
             var newlyCreatedUser = result.data;
             _users.splice(0, 0, newlyCreatedUser);
             deferred.resolve(newlyCreatedUser);
         },
         function () {
             // error
             deferred.reject();
         });

        return deferred.promise;
    };

    var _editUser = function(user) {

        var deferred = $q.defer();

        $http.put('/api/Users/' + user.Id, user)
         .then(function (result) {
             // success
             var editedUser = result.data;

             for (var i = 0; i < _users.length; i++) {
                 if (_users[i].Id === editedUser.Id) {
                     _users[i].UserName = editedUser.UserName;
                     _users[i].Email = editedUser.Email;
                     break;
                 }
             }

             deferred.resolve(editedUser);
         },
         function () {
             // error
             deferred.reject();
         });

        return deferred.promise;
    };

    var _deleteUser = function(user) {

        var deferred = $q.defer();

        $http.delete('/api/Users/' + user.Id, user)
         .then(function (result) {

             var deletedUser = result.data;

             for (var i = 0; i < _users.length; i++) {
                 if (_users[i].Id === deletedUser.Id) {
                     _users.splice(i, 1);
                     break;
                 }
             }

             deferred.resolve();
         },
         function () {
             // error
             deferred.reject();
         });

        return deferred.promise;
    };

    return {
        users: _users,
        getUsers: _getUsers,
        addUser: _addUser,
        editUser: _editUser,
        deleteUser: _deleteUser
    };
};

