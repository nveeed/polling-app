'use strict';
// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ui.router',
    'CustomDirectives',
    'Home',
	'Polls'// append more modules here
]).
config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
}]);

// @codekit-append "js/custom-directives.js"
// @codekit-append "js/developer.js"
// @codekit-append "pages/home/home.js"
// @codekit-append "pages/polls/polls.js"
// append more files here
