(function() {
    'use strict';

    angular
        .module('geodata')
        .controller('DetailsController', DetailsController);

    /** @ngInject */
    function DetailsController(GeoService, $sce, $window, $http) {
        var vm = this;
        _.extend(vm, {
            userName: $window.sessionStorage.name,
            userLname: $window.sessionStorage.lname,
            maxMagOb: GeoService.getMaxMagOb(),
            mostEqPlace: GeoService.mostEqCountry(),
            highMagSrc: false
        });
        if (angular.isDefined(vm.maxMagOb)) {
            $window.eqfeed_callback = function(detailsData) {
                var countryTitle = detailsData.properties.products.geoserve[0].properties.country;
                vm.highMagSrc = $sce.trustAsResourceUrl(vm.maxMagOb.properties.url);
                vm.highMagSrcWiki = $sce.trustAsResourceUrl('https://en.wikipedia.org/wiki/' + countryTitle);
            }
            $http.jsonp(vm.maxMagOb.properties.detail);
        }
    }
})();
