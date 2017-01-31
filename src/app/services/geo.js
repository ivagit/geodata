(function() {
    'use strict';

    angular
        .module('geodata')
        .service('GeoService', GeoService);

    /** @ngInject */
    function GeoService($http, GEO_URL, $window, $state) {
        var vm = this;
        // Init values
        return {
            getData: getData,
            getClosestEq: getClosestEq,
            getMaxMagOb: getMaxMagOb,
            mostEqCountry: mostEqCountry
        }

        function getData() {
            $window.eqfeed_callback = function(geoData) {
                vm.data = geoData;
            }
            return $http.jsonp(GEO_URL);
        }

        function getClosestEq(long, lat) {
            if (long && lat) {
                for (var f in vm.data.features) {
                    var feature = vm.data.features[f];

                    // Measuring distances
                    feature.distance = getDistance(
                        lat,
                        long,
                        feature.geometry.coordinates[1],
                        feature.geometry.coordinates[0]
                    );
                }

                return _.min(vm.data.features, function(f) {
                    return f.distance
                });
            }
        }

        function mostEqCountry() {
            var groups = groupPlaces();
            var biggestGroup = _.max(groups, function(c,key) {
                c.name = key;
                return c.length;
            });
            return biggestGroup.name;
        }

        function groupPlaces() {
            if (!_.isUndefined(vm.data)) {
                for (var f in vm.data.features) {
                    var feature = vm.data.features[f];
                    var pos = feature.properties.place.lastIndexOf(',');
                    var tail = feature.properties.place.substr(pos + 2);
                    feature.tail = tail;
                }

                return _.groupBy(vm.data.features, function(f) {
                    return f.tail;
                });
            }

        }

        function getMaxMagOb() {
            if (_.isUndefined(vm.data)) {
                $state.go('home');
            } else {
                return _.max(vm.data.features, function(f) {
                    return f.properties.mag;
                });
            }
        }

        function getDistance(lat1, lon1, lat2, lon2) {
            var radlat1 = Math.PI * lat1 / 180;
            var radlat2 = Math.PI * lat2 / 180;
            var theta = lon1 - lon2;
            var radtheta = Math.PI * theta / 180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            dist = Math.acos(dist);
            dist = dist * 180 / Math.PI;
            dist = dist * 60 * 1.1515;
            dist = dist * 1.609344;
            return dist || 0;
        }
    }
})();
