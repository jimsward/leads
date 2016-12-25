'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

    .controller('View2Ctrl', function(esriLoader, esriRegistry, $scope, $http, $location) {
      $scope.success = false
      $scope.donor = {}
      var self = this;
      esriLoader.require(['esri/Map', 'esri/layers/GraphicsLayer'], function(Map) {
        self.map = new Map({
          basemap: 'streets'
        })

        //GraphicsLayer.add(new Graphic({type : point, x : 34.52424638936832, y : -86.17346851184304}, MarkerSymbol));
        esriRegistry.get('myMapView').then(function(res) {
          // establish a click listener on the view in the response
          res.view.on('click', function(e) {
            // set or update the point property that is used in the html template
            self.mapViewPoint = e.mapPoint;

            console.log(self.mapViewPoint.latitude + ' , ' + self.mapViewPoint.longitude)
            $scope.donor.latitude = self.mapViewPoint.latitude
            $scope.donor.longitude = self.mapViewPoint.longitude


            // NOTE: $scope.$apply() is needed b/c the view's click event
            // happens outside of Angular's digest cycle
            $scope.$apply();


            $( "#dialog" ).dialog({
              modal: true
            });
            $scope.submit = function(){
              console.log($scope.first)
              var data = $scope.donor
              console.dir(data)
              $http({method : 'POST', url : '/newEntry', data : data }).then(function successCallback(){
                    $scope.success = true
                    var host = location.host;
                    var lastFour = $scope.donor.contact.toString().slice(6)
                    var link = host + '/' + 'user/' + $scope.donor.last + lastFour

                    $scope.donor.successmsg = 'Link to edit/delete your info: ' +  link
                  },function errorCallback(){
                    console.log('Error Callback')
                  }
              )
            }
          });
        });

      });
    });

