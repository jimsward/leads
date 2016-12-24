'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])
    .controller('View1Ctrl', function(esriLoader, esriRegistry, $scope) {
      var self = this;
      esriLoader.require(['esri/Map'], function(Map) {
        self.map = new Map({
          basemap: 'streets'
        })
        esriRegistry.get('myMapView').then(function(res) {
          // establish a click listener on the view in the response
          res.view.on('click', function(e) {
            // set or update the point property that is used in the html template
            self.mapViewPoint = e.mapPoint;

            console.log(self.mapViewPoint.latitude + ' , ' + self.mapViewPoint.longitude)

            // NOTE: $scope.$apply() is needed b/c the view's click event
            // happens outside of Angular's digest cycle
            $scope.$apply();


                  $( "#dialog" ).dialog({
                      modal: true
                  });
$scope.submit = function(){
console.log($scope.first)
}
          });
        });

      });
    });












