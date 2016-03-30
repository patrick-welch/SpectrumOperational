﻿angular
    .module('app.eoc')
    .controller('CheckListsController', CheckListsController)
    .config(config);

function config($stateProvider, $urlRouterProvider, $compileProvider) {

    // Optimize load start with remove binding information inside the DOM element
    $compileProvider.debugInfoEnabled(true);

    // Set default state
    //$urlRouterProvider.otherwise("/dashboard");

    $stateProvider
        .state('index', {
            url: "",
            templateUrl: "/Eoc/Templates/CheckList/CheckListIndex",
            data: { pageTitle: 'index' }
        });
}

function userRoleParameters() {
    this.userId = null;
    this.organizationId = null;
};

function CheckListsController($scope) {
    // Handle actions
    $scope.remove = function (scope) {
        scope.remove();
    };

    $scope.toggle = function (scope) {
        scope.toggle();
    };

    $scope.moveLastToTheBeginning = function () {
        var a = $scope.data.pop();
        $scope.data.splice(0, 0, a);
    };

    $scope.newSubItem = function (scope) {
        var nodeData = scope.$modelValue;
        nodeData.nodes.push({
            id: nodeData.id * 10 + nodeData.nodes.length,
            title: nodeData.title + '.' + (nodeData.nodes.length + 1),
            nodes: []
        });
    };

    $scope.collapseAll = function () {
        $scope.$broadcast('collapseAll');
    };

    $scope.expandAll = function () {
        $scope.$broadcast('expandAll');
    };

    // Nestable list example data
    $scope.data = [
        {
            "id": 1,
            "title": "Respirator",
            "nodes": [
                {
                    "id": 11,
                    "title": "Extra cartridges",
                    "nodes": [
                        {
                            "id": 111,
                            "title": "node1.1.1",
                            "nodes": []
                        }
                    ]
                },
                {
                    "id": 12,
                    "title": "Surefire light",
                    "nodes": []
                }
            ]
        },
        {
            "id": 2,
            "title": "Radio",
            "nodes": [
                {
                    "id": 21,
                    "title": "Spare battery",
                    "nodes": []
                },
                {
                    "id": 22,
                    "title": "PTT Keyset",
                    "nodes": []
                }
            ]
        },
        {
            "id": 3,
            "title": "Canine handler equipment",
            "nodes": [
                {
                    "id": 31,
                    "title": "Harness",
                    "nodes": []
                }
            ]
        }
    ];
}