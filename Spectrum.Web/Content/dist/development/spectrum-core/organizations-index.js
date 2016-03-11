'use strict';

angular.module('app').controller('OrganizationController', organizationController).config(config);

function config($stateProvider, $urlRouterProvider, $compileProvider) {

    // Optimize load start with remove binding information inside the DOM element
    $compileProvider.debugInfoEnabled(true);

    // Set default state
    //$urlRouterProvider.otherwise("/dashboard");

    $stateProvider.state('index', {
        url: "",
        templateUrl: "/Templates/Organization/OrganizationIndex",
        data: {
            pageTitle: 'index'
        }
    }).state('roles', {
        url: "/roles/:organizationId",
        templateUrl: "/Templates/Organization/OrganizationRoles",
        data: {
            pageTitle: 'roles'
        }
    }).state('profiles', {
        url: "/profiles/:organizationId",
        templateUrl: "/Templates/Organization/OrganizationProfiles",
        params: { organizationId: null },
        data: {
            pageTitle: 'profiles'
        }
    }).state('positions', {
        url: "/positions/:organizationId",
        templateUrl: "/Templates/Organization/OrganizationPositions",
        params: { organizationId: null },
        data: {
            pageTitle: 'positions'
        }
    });
}

function organizationController($scope, $http, $uibModal, $state, organizationFactory) {

    $uibModal.scope = $scope;

    $scope.data = organizationFactory;

    organizationFactory.getOrganizations().then(function (organizations) {
        // success
        //$scope.data = organization;
    }, function () {
        // error
        alert("Sorry! There was a problem loading organizations.  Please try again later.");
    });

    $scope.add = function () {
        var modalInstance = $uibModal.open({
            templateUrl: "/Templates/Organization/addOrganizationModal",
            controller: AddOrganizationModalController
        });
    };

    $scope.edit = function (_organization) {
        var modalInstance = $uibModal.open({
            templateUrl: "/Templates/Organization/editOrganizationModal",
            controller: EditOrganizationModalController,
            resolve: {
                organization: function organization() {
                    return angular.copy(_organization);
                }
            }
        });
    };

    $scope.delete = function (_organization2) {
        var modalInstance = $uibModal.open({
            templateUrl: "/Templates/Organization/deleteOrganizationModal",
            controller: DeleteOrganizationModalController,
            resolve: {
                organization: function organization() {
                    return angular.copy(_organization2);
                }
            }
        });
    };

    $scope.profiles = function (organization) {
        $state.go('profiles', { 'organizationId': organization.Id });
    };

    $scope.roles = function (organization) {
        $state.go('roles', { 'organizationId': organization.Id });
    };

    $scope.positions = function (organization) {
        $state.go('positions', { 'organizationId': organization.Id });
    };
};

function AddOrganizationModalController($scope, $uibModalInstance, organizationFactory) {

    $scope.ok = function (organization) {

        organizationFactory.addOrganizations(organization).then(function () {
            // success
            $uibModalInstance.close();
        }, function () {
            // error
            alert("could not save organization");
        });

        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};

function EditOrganizationModalController($scope, $uibModalInstance, organizationFactory, organization) {

    $scope.organization = organization;

    $scope.ok = function () {

        organizationFactory.editOrganizations(organization).then(function () {
            // success
        }, function () {
            // error
            alert("could not edit or update organization");
        });

        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};

function DeleteOrganizationModalController($scope, $uibModalInstance, organizationFactory, organization) {

    $scope.organization = organization;

    $scope.ok = function () {

        organizationFactory.deleteOrganizations(organization).then(function () {
            // success

        }, function () {
            // error
            alert("could not delete organization");
        });

        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};

/**
 * Pass function into module
 */
angular.module('app').factory('organizationFactory', organizationFactory);

function organizationFactory($http, $q) {

    var _organizations = [];

    var _getOrganizations = function _getOrganizations() {

        var deferred = $q.defer();

        $http.get('/api/Organizations').then(function (result) {
            // Successful
            angular.copy(result.data, _organizations);
            deferred.resolve(_organizations);
        }, function () {
            // Error
            deferred.reject();
        });

        return deferred.promise;
    };

    var _addOrganization = function _addOrganization(newOrganization) {

        var deferred = $q.defer();

        $http.post('/api/Organizations', newOrganization).then(function (result) {
            // success
            var newlyCreatedOrganization = result.data;
            _organizations.splice(0, 0, newlyCreatedOrganization);
            deferred.resolve(newlyCreatedOrganization);
        }, function () {
            // error
            deferred.reject();
        });

        return deferred.promise;
    };

    var _editOrganization = function _editOrganization(organization) {

        var deferred = $q.defer();

        $http.put('/api/Organizations/' + organization.Id, organization).then(function (result) {
            // success
            var editedOrganization = result.data;

            for (var i = 0; i < _organizations.length; i++) {
                if (_organizations[i].Id === editedOrganization.Id) {
                    _organizations[i].Name = editedOrganization.Name;
                    _organizations[i].TypeId = editedOrganization.TypeId;
                    break;
                }
            }

            deferred.resolve(editedOrganization);
        }, function () {
            // error
            deferred.reject();
        });

        return deferred.promise;
    };

    var _deleteOrganization = function _deleteOrganization(organization) {

        var deferred = $q.defer();

        $http.delete('/api/Organizations/' + organization.Id, organization).then(function (result) {

            var deletedOrganization = result.data;

            for (var i = 0; i < _organizations.length; i++) {
                if (_organizations[i].Id === deletedOrganization.Id) {
                    _organizations.splice(i, 1);
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
        organizations: _organizations,
        getOrganizations: _getOrganizations,
        addOrganizations: _addOrganization,
        editOrganizations: _editOrganization,
        deleteOrganizations: _deleteOrganization
    };
};