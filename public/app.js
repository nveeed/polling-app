'use strict';
// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ui.router',
    'CustomDirectives',
    'Home'// append more modules here
]).
config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
}]);

// @codekit-append "js/custom-directives.js"
// @codekit-append "js/developer.js"
// @codekit-append "pages/home/home.js"
// append more files here
