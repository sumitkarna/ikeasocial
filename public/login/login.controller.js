
    angular
        .module('employees')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService', 'EmployeeService'];
    function LoginController($location, AuthenticationService, FlashService, EmployeeService) {
        var vm = this;

        vm.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    EmployeeService.GetById(vm.username)
                .then(function (resp) {
                        if(resp.data.noRecords){
                            $location.path('/new');
                        }else {
                            $location.path('/employee/'+vm.username);
                        }
                    });
                   
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        };
    }


