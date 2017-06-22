angular.module('employees')
        .controller('ProfileCratioinController', ProfileCratioinController);


// Controller for creating a new employee
ProfileCratioinController.$inject = ['EmployeeService','UserService', '$location','$scope', '$rootScope', 'FlashService'];
    function ProfileCratioinController(EmployeeService,UserService, $location, $scope,$rootScope, FlashService) {
        var vm = this;
		vm.employee={
		name:fullname,role:'',basedin:'',emailaddr:$rootScope.globals.currentUser.username,team:'',phone:'',aboutme:'',
        biggestmistake:'',successtory:'',funfact:'',watchoutfor:'',notoverlook:'',joinmonthibm:'',joinyearibm:'',
        joinmonthikea:'',joinyearikea:'',birthday:'',birthmonth:'',anniversaryday:'',anniversarymonth:'',
        facebooklink:'',linkedinlink:'',twitterlink:'',instagramlink:''
	};
        vm.createEmployee = createEmployee;
        $scope.init=getUserByID;
        var fullname;
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

        function getUserByID() {
            vm.dataLoading = true;
            UserService.GetById($rootScope.globals.currentUser.username)
                .then(function (response) {
                    fullname=response.firstname+' '+response.lastname;
                     $scope.employee={
                        fullname:fullname,
                        emailaddr:response.userid
                     }
                   
                });
        }
    }
