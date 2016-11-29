/**
 * Created by Jim on 11/24/2016.
 */
var app = angular.module('myApp.editFormCtl', [])

app.controller('editFormCtl', ['$scope', '$http', '$filter', '$rootScope', 'addEntry', '$route', function($scope, $http, $filter, $rootScope, addEntry, $route){
$scope.lead = $rootScope.selected
    $scope.save = function(){
        var data = $scope.lead
        var promise =
        $http({url : '/update', method : "POST", data : data})
            .then(function successCallback(){$route.reload()}, function errorCallback(result){
        console.log(result)
    })}
    $scope.cancel = function(){
        console.log('cancelled')
        $route.reload()    }
}])

app.factory('addEntry', ['$http', function($http) {
    return {
        newEnt: function (data) {
            return $http({url: '/newentry', data: data, method: "POST"})
        }
    }
}])
app.directive('editForm', function(){
    return {
        restrict: 'AE',
        templateUrl : 'editForm/editForm.html'
    }
})