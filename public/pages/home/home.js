'use strict';

angular.module('Home', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: '/pages/home/home.html',
        controller: 'HomeCtrl'
    });
}])

.controller('HomeCtrl', ['$scope', function ( scope ) {
    $("#menu-today").showLoader();
}]);