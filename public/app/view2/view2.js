'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$http', '$scope', '$rootScope', '$compile', function($http, $scope, $rootScope, $compile) {
  var promise = $http({ url : '/getEntries', method : 'GET' })
  promise.then(function successCallback(response){
    $scope.entries = response.data.entries
    console.dir(response)
  }, function errorCallback(response){
    console.log('error ' + response)
  }
  )

  $scope.openForm = function(lead, index){
    angular.element('edit-form').remove()
console.dir(lead)
    $rootScope.selected = lead
console.log(typeof index)
    var sindex = index.toString()
    $('tr#' + sindex).replaceWith($compile("<edit-form/>")($scope));

  }
  }]);

