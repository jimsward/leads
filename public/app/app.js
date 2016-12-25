'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'ngMaterial',
  'md.data.table',
  'myApp.editFormCtl',
  'myApp.version',
    'esri.map'
]).config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {

  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  }).otherwise({redirectTo: '/view1'});
}]);
