﻿(function() {

    angular
        .module("app.eoc")
        .controller("IncidentMgmtCtrl", IncidentMgmtCtrl);

    IncidentMgmtCtrl.$inject = ["incidentData", "$uibModal"];

    function IncidentMgmtCtrl(incidentData, $uibModal) {

        // Setting scope object
        var vm = this;

        // Defining variables at top of controller to quickly
        // scan all available operations
        vm.name = "Sean";
        vm.incidents = [];
        vm.openModal = function() {
            var modalDialog = $uibModal.open({
                templateUrl: "Eoc/Templates/IncidentManagement/IncidentManagementAddModal",
                controller: openModalInstance
            });
            modalDialog.result.finally(function() {
                getIncidents();
            });
        };
        vm.deleteModal = function(incident) {

            var modalDialog = $uibModal.open({
                templateUrl: "Eoc/Templates/IncidentManagement/IncidentManagementDeleteModal",
                controller: deleteModalInstance,
                resolve: {
                    incidentModalData: function() {
                        return incident;
                    }
                }
            });
            modalDialog.result.finally(function() {
                getIncidents();
            });
        };
        vm.editModal = function(incident) {
            var modalDialog = $uibModal.open({
                templateUrl: "Eoc/Templates/IncidentManagement/IncidentManagementEditModal",
                controller: editModalInstance,
                resolve: {
                    incidentModalData: function() {
                        return incident;
                    }
                }
            });
            modalDialog.result.finally(function() {
                getIncidents();
            });
        };

        // Activate the page
        activate();

        // Then define controller functions
        function activate() {
            return getIncidents();
        }

        function getIncidents() {
            return incidentData.getIncidents()
                .then(function(incidents) {
                        vm.incidents = incidents;
                    },
                    function() {
                        console.log("Error loading incidents.  See log.");
                    });
        }

        editModalInstance.$inject = ["$scope", "$uibModalInstance", "incidentModalData", "incidentData"];

        function editModalInstance($scope, $uibModalInstance, incidentModalData, incidentData) {

            var incidentTypes = incidentData.getIncidentTypes();
            var incidentType = getIndex(incidentTypes, incidentModalData.type);

            $scope.incident = {
                incidentTypes: incidentTypes,
                incidentLevels: incidentData.getIncidentLevels(),
                statuses: incidentData.getIncidentStatuses(),
                name: incidentModalData.incidentName,
                selectedLevel: incidentModalData.level.toString(),
                organizationId: incidentModalData.organizationId,
                selectedStatus: incidentModalData.status,
                selectedType: incidentType,
                userId: incidentModalData.userId
            };

            $scope.close = function() {
                $uibModalInstance.dismiss("cancel");
            };

            $scope.saveChanges = function(incident) {
                // Edit the incident
                incidentData.editIncident(incident)
                    .then(function() {
                        $uibModalInstance.close();
                    }, function(result) {
                        console.log(result.message);
                    });
            };

            function getIndex(values, searchVal) {
                for (var i = 0; i < values.length; i++)
                {
                    if (values[i].name === searchVal)
                    {
                        return values[i];
                    }
                }
            }
        }

        deleteModalInstance.$inject = ["$scope", "$uibModalInstance", "incidentModalData"];

        function deleteModalInstance($scope, $uibModalInstance, incidentModalData) {

            $scope.incidentId = incidentModalData.id;
            $scope.incidentName = incidentModalData.incidentName;

            $scope.cancel = function() {
                $uibModalInstance.dismiss("cancel");
            };

            $scope.delete = function(incidentId) {

                // Remove the incident
                incidentData.deleteIncident(incidentId)
                    .then(function() {
                        $uibModalInstance.close();
                    }, function(result) {
                        console.log(result.message);
                    });
            };
        }

        openModalInstance.$inject = ["$scope", "$uibModalInstance", "incidentData"];

        function openModalInstance($scope, $uibModalInstance, incidentData) {

            $scope.debugEnabled = false;
            $scope.incident = {
                name: "",
                selectedType: { "id": 2, "name": "Natural Disaster" },
                incidentTypes: incidentData.getIncidentTypes(),
                selectedLevel: null,
                incidentLevels: incidentData.getIncidentLevels()
            };

            $scope.saveChanges = function(incident) {

                // We have to shape the model a bit here
                var incidentModel = {
                    userId: null,
                    organizationId: null,
                    incidentName: incident.name,
                    type: incident.selectedType.name,
                    level: incident.selectedLevel,
                    status: "Active" // always active to begin
                };

                // Add the incident
                incidentData.addIncident(incidentModel)
                    .then(function() {
                        $uibModalInstance.close();
                    }, function(result) {
                        console.log(result.message);
                    });
            };

            $scope.close = function() {
                $uibModalInstance.dismiss("cancel");
            };
        }
    }

})();