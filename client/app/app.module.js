    (function () {
        'use strict';

        angular
            .module('coworkersconnect', ['ngAnimate', 'ngRoute'])
            .config(routeConfig);
        
        routeConfig.$inject = ['$routeProvider'];

        function routeConfig($routeProvider) {
            $routeProvider
                .when('/',{ templateUrl: 'app/dashboard/dashboard.html', title: 'people'})
                .when('/avengers',{ templateUrl: 'app/avengers/avengers.html', title: 'avengers'})
                .otherwise({ redirectTo: '/' });
        }
    })();