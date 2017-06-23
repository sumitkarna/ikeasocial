angular.module('employees')
        .controller('ProfileUpdationController', ProfileUpdationController);


// Controller for updating a new employee
ProfileUpdationController.$inject = ['EmployeeService', '$location', '$rootScope', '$scope','FlashService'];
    function ProfileUpdationController(EmployeeService, $location, $rootScope, $scope,FlashService) {
         var vm = this;
       vm.updateEmployee = updateEmployee;
       $scope.init = GetEmployeeById;

        function GetEmployeeById() {
            vm.dataLoading = true;
            EmployeeService.GetEmployeeDetailsById($rootScope.globals.currentUser.username)
                .then(function (response) {
                    $scope.employee={
                        name : response.data.name,
                        team : response.data.team,
                        emailaddr : response.data.emailaddr,
                        role: response.data.role,
                        basedin: response.data.basedin,
                        phone: response.data.phone,
                        aboutme: response.data.aboutme,
                        notoverlook: response.data.notoverlook,
                        biggestmistake: response.data.biggestmistake,
                        successtory: response.data.successtory,
                        funfact:response.data.funfact,
                        watchoutfor: response.data.watchoutfor,
                        joinmonthibm:response.data.joinmonthibm,
                        joinyearibm:response.data.joinyearibm,
                        joinmonthikea:response.data.joinmonthikea,
                        joinyearikea:response.data.joinyearikea,
                        birthday: response.data.birthday,
                        birthmonth:response.data.birthmonth,
                        annieversaryday: response.data.annieversaryday,
                        aniversarymonth:response.data.aniversarymonth,
                        facebooklink: response.data.facebooklink,
                        instagramlink: response.data.instagramlink,
                        twitterlink: response.data.twitterlink,
                        linkedinlink: response.data.linkedinlink
                    };
                    if (response.success) {
                        FlashService.Success('Employee detail successful', true);
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                   
                });
        }

        function updateEmployee() {
            vm.dataLoading = true;
            EmployeeService.Update($scope.employee)
                .then(function (response) {
                    if (response.data.success) {
                        $location.path('/employee/'+$scope.employee.emailaddr);
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        }
    }
