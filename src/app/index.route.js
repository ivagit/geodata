(function() {
    'use strict';

    angular
        .module('geodata')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/main/main.html',
                controller: 'MainController',
                controllerAs: 'main'
            })
            .state('details', {
                url: '/details',
                templateUrl: 'app/details/details.html',
                controller: 'DetailsController',
                controllerAs: 'details'
            })

        $urlRouterProvider.otherwise('/');
    }

})();
