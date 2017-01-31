(function() {
    'use strict';

    angular
        .module('geodata')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController($sce, GeoService, $state, $window) {
        var vm = this;
        GeoService.getData();

        // Init values
        _.extend(vm, {
            showedResult: false,
            closestEqe: false
        })

        // Methods
        _.extend(vm, {
            getData: function() {
                if (_.isObject($window.sessionStorage)) {
                    $window.sessionStorage.name = vm.user.fname;
                    $window.sessionStorage.lname = vm.user.lname
                    $state.go('details');
                }
            },
            calcData: function() {
                if (vm.coords.long && vm.coords.lat) {
                  vm.closestEq = GeoService.getClosestEq(vm.coords.long, vm.coords.lat);
                    _.extend(vm, {
                        mapSource: $sce.trustAsResourceUrl('https://www.google.com/maps/embed/v1/place?key=AIzaSyCUuNmdQqoT1HbWLTFQbR0JoxhkBbT5ouc&zoom=10&q=' + vm.closestEq.geometry.coordinates[1] + ',' + vm.closestEq.geometry.coordinates[0])
                    });
                }
            },
            showResult: _.once(function() {
                vm.showedResult = !vm.showedResult;
            })
        })
    }
})();
