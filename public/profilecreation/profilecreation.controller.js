angular.module('employees')
        .controller('ProfileCratioinController', ProfileCratioinController);


// Controller for creating a new employee
ProfileCratioinController.$inject = ['EmployeeService', '$location', '$rootScope', 'FlashService'];
    function ProfileCratioinController(EmployeeService, $location, $rootScope, FlashService) {
        var vm = this;
		vm.employee={
		name: '',role:'',basedin:'',emailaddr:$rootScope.globals.currentUser.username,team:'',phone:'',aboutme:'',
        biggestmistake:'',successtory:'',funfact:'',watchoutfor:'',notoverlook:'',joinmonthibm:'',joinyearibm:'',
        joinmonthikea:'',joinyearikea:'',birthday:'',birthmonth:'',anniversaryday:'',anniversarymonth:'',
        facebooklink:'',linkedinlink:'',twitterlink:'',instagramlink:''
	};
        vm.createEmployee = createEmployee;

        function createEmployee() {
            vm.dataLoading = true;
            EmployeeService.Create(vm.employee)
                .then(function (response) {
                    if (response.data.success) {
                        $location.path('/employee/'+response.data.emailaddr);
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        }
    }
