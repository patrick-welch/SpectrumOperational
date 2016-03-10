"use strict";

(function (app) {

    "use strict";

    app.service("UserService", userService);

    userService.$inject = ["$http", "$q"];

    function userService($http, $q) {

        var users = [];

        var getUsers = function getUsers() {

            var deferred = $q.defer();

            $http.get("/api/Users").then(function (result) {

                // Successful
                angular.copy(result.data, users);
                deferred.resolve(users);
            }, function () {
                // Error
                deferred.reject();
            });

            return deferred.promise;
        };

        var addUser = function addUser(newUser) {

            var deferred = $q.defer();

            $http.post("/api/Users", newUser).then(function (result) {

                // success
                var newlyCreatedUser = result.data;
                users.splice(0, 0, newlyCreatedUser);
                deferred.resolve(newlyCreatedUser);
            }, function () {
                // error
                deferred.reject();
            });

            return deferred.promise;
        };

        var editUser = function editUser(user) {
            var deferred = $q.defer();

            $http.put("/api/Users/" + user.Id, user).then(function (result) {
                // success
                var editedUser = result.data;
                for (var i = 0; i < users.length; i++) {
                    if (users[i].Id === editedUser.Id) {
                        users[i].UserName = editedUser.UserName;
                        users[i].Email = editedUser.Email;
                        break;
                    }
                }

                deferred.resolve(editedUser);
            }, function () {
                // error
                deferred.reject();
            });

            return deferred.promise;
        };

        var deleteUser = function deleteUser(user) {
            var deferred = $q.defer();

            $http.delete("/api/Users/" + user.Id, user).then(function (result) {
                var deletedUser = result.data;
                for (var i = 0; i < users.length; i++) {
                    if (users[i].Id === deletedUser.Id) {
                        users.splice(i, 1);
                        break;
                    }
                }

                deferred.resolve();
            }, function () {
                // error
                deferred.reject();
            });

            return deferred.promise;
        };
        return {
            users: users,
            getUsers: getUsers,
            addUser: addUser,
            editUser: editUser,
            deleteUser: deleteUser
        };
    }
})(angular.module("app"));
