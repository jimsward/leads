angular.module('esri-map-docs', ['ngRoute', 'ngSanitize', 'ngAnimate', 'ngSelect',  'esri.map'])
    .controller('RegistryPatternCtrl', function(esriLoader) {
        var self = this;

        self.mapViewOptions = {
            zoom: 4,
            center: [15, 65]
        };


        // load esri modules
        esriLoader.require([
            'esri/Map'
        ], function(Map) {
            // check that the device/browser can support WebGL
            //  by inspecting the userAgent and
            //  by handling the scene view directive's on-error
            //self.showSceneViewError = browserDetectionService.isMobile();

            /*self.onSceneViewError = function() {
                self.showSceneViewError = false;
            };*/

            // create the map
            self.map = new Map({
                basemap: 'streets'
            });

            // NOTE: This is one way to get a reference to the map or scene view within
            //  the SAME parent controller, by binding to the on-create callback.
            /*self.onMapViewCreated = function(view) {
                self.mapView = view;
                // do something with the map view
            };*/
            /*self.onSceneViewCreated = function(view) {
                self.sceneView = view;
                // do something with the scene view
            };*/
        });
    })
    .controller('AnotherController', function(esriRegistry, $scope) {
        // NOTE: This is a way to get a reference to a view in
        //  a DIFFERENT controller, by setting the register-as attribute
        //  on the view directive and then using esriRegistry to get the view by name.
        var self = this;
        console.log('registry')
        esriRegistry.get('myMapView').then(function(res) {
            // establish a click listener on the view in the response
            res.view.on('click', function(e) {
                // set or update the point property that is used in the html template
                self.mapViewPoint = e.mapPoint;

                // NOTE: $scope.$apply() is needed b/c the view's click event
                // happens outside of Angular's digest cycle
                $scope.$apply();
            });
        });


    });/**
 * Created by Jim on 12/21/2016.
 */
