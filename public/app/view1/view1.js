'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])
    .controller('View1Ctrl', function(esriLoader, esriRegistry, $scope, $http, $location, $routeParams) {
        if ($routeParams.link){
            console.dir($routeParams.link)
            var params = $routeParams
          $http({method : 'GET',url :  '/user', params : params})
              .then(function successCallback(response){
                  console.dir(response)
                  $scope.success = false
                  $scope.donor = response.data

              }, function errorCallback(response){
                  console.log(response)
              })
        }
        else {
        $scope.success = false
        $scope.donor = {}
      var self = this;
      esriLoader.require(['esri/Map'], function(Map) {
          self.map = new Map({
              basemap: 'streets'
          })
          esriRegistry.get('myMapView').then(function (res) {
              // establish a click listener on the view in the response
              res.view.on('click', function (e) {
                  // set or update the point property that is used in the html template
                  self.mapViewPoint = e.mapPoint;

                  console.log(self.mapViewPoint.latitude + ' , ' + self.mapViewPoint.longitude)
                  $scope.donor.latitude = self.mapViewPoint.latitude
                  $scope.donor.longitude = self.mapViewPoint.longitude


                  // NOTE: $scope.$apply() is needed b/c the view's click event
                  // happens outside of Angular's digest cycle
                  $scope.$apply();
                  $("#dialog").dialog({
                      modal: true
                  });
              })
          })
      })
        }
$scope.submit = function(){
    var data = $scope.donor
    var host = location.host;
    var lastFour = $scope.donor.contact.toString().slice(6)
    var link = $scope.donor.last +lastFour
    data.link = host + '/?link=' + link
data.key = link
    console.dir(data.link)
    $http({method : 'POST', url : '/newEntry', data : data }).then(function successCallback(){
        $scope.success = true
        $scope.donor.successmsg = 'Link to edit/delete your info: ' +  data.link
    },function errorCallback(){
        console.log('Error Callback')
    }
    )
}

        })















