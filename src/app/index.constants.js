/* global _:true */
(function() {
  'use strict';

  angular
    .module('geodata')
    .constant('_', _)
    .constant('GEO_URL', 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp');
})();
