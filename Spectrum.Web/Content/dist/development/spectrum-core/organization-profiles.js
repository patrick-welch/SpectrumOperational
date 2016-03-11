'use strict';

angular.module('app').controller('OrganizationProfileController', organizationProfileController);

function organizationProfileParameters() {
    this.organizationId = null;
};

function organizationProfileController($scope, $http, $window, $uibModal, $stateParams, organizationProfileFactory) {

    $scope.organizationId = $stateParams.organizationId;
    organizationProfileParameters.organizationId = $scope.organizationId;

    $uibModal.scope = $scope;
    $scope.data = organizationProfileFactory;

    organizationProfileFactory.getOrganizationProfiles($scope.organizationId).then(function (organizationProfiles) {
        // success
        //$scope.data = organization;
    }, function () {
        // error
        alert("Sorry! There was a problem loading organization profiles.  Please try again later.");
    });

    $scope.add = function () {
        var modalInstance = $uibModal.open({
            templateUrl: '/Templates/Organization/addOrganizationProfileModal',
            controller: AddOrganizationProfileModalController
        });
    };

    $scope.edit = function (_organizationProfile) {
        var modalInstance = $uibModal.open({
            templateUrl: '/Templates/Organization/EditOrganizationProfileModal',
            controller: EditOrganizationProfileModalController,
            resolve: {
                organizationProfile: function organizationProfile() {
                    return angular.copy(_organizationProfile);
                }
            }
        });
    };

    $scope.delete = function (_organizationProfile2) {
        var modalInstance = $uibModal.open({
            templateUrl: '/Templates/Organization/deleteOrganizationProfileModal',
            controller: DeleteOrganizationProfileModalController,
            resolve: {
                organizationProfile: function organizationProfile() {
                    return angular.copy(_organizationProfile2);
                }
            }
        });
    };
};

function AddOrganizationProfileModalController($scope, $uibModalInstance, organizationProfileFactory) {

    $scope.ok = function (organizationProfile) {

        organizationProfile.OrganizationId = organizationProfileParameters.organizationId;

        organizationProfileFactory.addOrganizationProfiles(organizationProfile).then(function () {
            // success
            $uibModalInstance.close();
        }, function () {
            // error
            alert("could not save organization profile");
        });

        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};

function EditOrganizationProfileModalController($scope, $uibModalInstance, organizationProfileFactory, organizationProfile) {

    $scope.organizationProfile = organizationProfile;

    $scope.ok = function () {

        organizationProfileFactory.editOrganizationProfiles(organizationProfile).then(function () {
            // success
        }, function () {
            // error
            alert("could not edit or update organization profile");
        });

        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};

function DeleteOrganizationProfileModalController($scope, $uibModalInstance, organizationProfileFactory, organizationProfile) {

    $scope.organizationProfile = organizationProfile;

    $scope.ok = function () {

        organizationProfileFactory.deleteOrganizationProfiles(organizationProfile).then(function () {
            // success

        }, function () {
            // error
            alert("could not delete organization profile");
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
angular.module('app').factory('organizationProfileFactory', organizationProfileFactory);

function organizationProfileFactory($http, $q) {

    var _organizationProfiles = [];

    var _getOrganizationProfiles = function _getOrganizationProfiles(id) {

        var deferred = $q.defer();

        $http.get('/api/OrganizationProfiles/' + id).then(function (result) {
            // Successful
            angular.copy(result.data, _organizationProfiles);
            deferred.resolve(_organizationProfiles);
        }, function () {
            // Error
            deferred.reject();
        });

        return deferred.promise;
    };

    var _addOrganizationProfile = function _addOrganizationProfile(newOrganizationProfile) {

        var deferred = $q.defer();

        $http.post('/api/OrganizationProfiles', newOrganizationProfile).then(function (result) {
            // success
            var newlyCreatedOrganizationProfile = result.data;
            _organizationProfiles.splice(0, 0, newOrganizationProfile);
            deferred.resolve(newlyCreatedOrganizationProfile);
        }, function () {
            // error
            deferred.reject();
        });

        return deferred.promise;
    };

    var _editOrganizationProfile = function _editOrganizationProfile(organizationProfile) {

        var deferred = $q.defer();

        $http.put('/api/OrganizationProfiles/' + organizationProfile.Id, organizationProfile).then(function (result) {
            // success
            var editedOrganizationProfile = result.data;

            for (var i = 0; i < _organizationProfiles.length; i++) {
                if (_organizationProfiles[i].Id === editedOrganizationProfile.Id) {
                    _organizationProfiles[i].Default = editedOrganizationProfile.Default;
                    _organizationProfiles[i].Name = editedOrganizationProfile.Name;
                    _organizationProfiles[i].Description = editedOrganizationProfile.Description;
                    _organizationProfiles[i].PrimaryContact = editedOrganizationProfile.PrimaryContact;
                    _organizationProfiles[i].Phone = editedOrganizationProfile.Phone;
                    _organizationProfiles[i].Fax = editedOrganizationProfile.Fax;
                    _organizationProfiles[i].Email = editedOrganizationProfile.Email;
                    _organizationProfiles[i].Country = editedOrganizationProfile.Country;
                    _organizationProfiles[i].County = editedOrganizationProfile.County;
                    _organizationProfiles[i].TimeZone = editedOrganizationProfile.TimeZone;
                    _organizationProfiles[i].Language = editedOrganizationProfile.Language;
                    _organizationProfiles[i].Notes = editedOrganizationProfile.Notes;

                    //_organizationProfiles[i].val = editedOrganizationProfile.val;

                    break;
                }
            }

            deferred.resolve(editedOrganizationProfile);
        }, function () {
            // error
            deferred.reject();
        });

        return deferred.promise;
    };

    var _deleteOrganizationProfile = function _deleteOrganizationProfile(organizationProfile) {

        var deferred = $q.defer();

        $http.delete('/api/OrganizationProfiles/' + organizationProfile.Id, organizationProfile).then(function (result) {

            var deletedOrganizationProfile = result.data;

            for (var i = 0; i < _organizations.length; i++) {
                if (_organizationProfiles[i].Id === deletedOrganizationProfile.Id) {
                    _organizationProfiles.splice(i, 1);
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
        organizationProfiles: _organizationProfiles,
        getOrganizationProfiles: _getOrganizationProfiles,
        addOrganizationProfiles: _addOrganizationProfile,
        editOrganizationProfiles: _editOrganizationProfile,
        deleteOrganizationProfiles: _deleteOrganizationProfile
    };
};