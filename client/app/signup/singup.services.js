(function () {
    'use strict';

    angular
        .module('coworkersconnect')
        .factory('signupService', signupService);

    function singupService() {
        var service = {
            saveProfile= saveProfile
        };

        return service;

        function saveProfile() {

            return $http.get("/profile").
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error finding profile.");
        
        }
    }
})();