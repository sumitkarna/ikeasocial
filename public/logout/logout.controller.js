
    angular
        .module('employees')
        .controller('LogoutController', LogoutController);

    LogoutController.$inject = ['$location', '$scope', '$window', 'FlashService', 'EmployeeService','AuthenticationService'];
    function LogoutController($location, $scope, $window, FlashService, EmployeeService,AuthenticationService) {
        AuthenticationService.ClearCredentials();
        Session.clear();
        localStorage.clearAll();
        $window.localStorage.clear();
        $location.path('/');
    
    }


