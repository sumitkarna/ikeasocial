angular.module('employees')
        .controller('ProfileUpdationController', ProfileUpdationController);


// Controller for updating a new employee
ProfileUpdationController.$inject = ['EmployeeService', '$location', '$rootScope', 'FlashService'];
    function ProfileUpdationController(EmployeeService, $location, $rootScope, FlashService) {
        var vm = this;
		vm.employee={
		name: '',role:'',basedin:'',emailaddr:$rootScope.globals.currentUser.username,team:'',phone:'',aboutme:'',
        biggestmistake:'',successtory:'',funfact:'',watchoutfor:'',notoverlook:'',joinmonthibm:'',joinyearibm:'',
        joinmonthikea:'',joinyearikea:'',birthday:'',birthmonth:'',anniversaryday:'',anniversarymonth:'',
        facebooklink:'',linkedinlink:'',twitterlink:'',instagramlink:''
	};
        vm.updateEmployee = updateEmployee;

        function updateEmployee() {
            alert('Hello');
            alert(vm.employee);
            vm.dataLoading = true;
            EmployeeService.Update(vm.employee,vm.employee.id)
                .then(function (response) {
                    if (response.data.success) {
                        $location.path('/employee/'+vm.emailaddr);
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        }
    }
