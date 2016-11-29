'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope){
  $rootScope.currentNavItem="enter"


  $scope.lead = {}
  $scope.save = function(){
    var data = $scope.lead
    console.dir('data ' + data)
    $http.post('/newEntry', data).then( function successCallback(){location.reload()}, function errorCallback(result){
console.log(result)
    })
  }

}]);