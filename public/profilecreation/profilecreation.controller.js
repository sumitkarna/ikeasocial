angular.module('employees')
        .controller('ProfileCratioinController', ProfileCratioinController);


// Controller for creating a new employee
ProfileCratioinController.$inject = ['EmployeeService','UserService', '$location','$scope', '$rootScope', 'FlashService'];
    function ProfileCratioinController(EmployeeService,UserService, $location, $scope,$rootScope, FlashService) {
        var vm = this;
        vm.createEmployee = createEmployee;
         $scope.init=getUserByID;

        function getUserByID() {
            vm.dataLoading = true;
            UserService.GetById($rootScope.globals.currentUser.username)
                .then(function (response) {
                    var fullname=response.firstname+' '+response.lastname;
                     $scope.employee={
                        name:fullname,
                        emailaddr:response.userid,
                        role:'',basedin:'',team:'',phone:'',aboutme:'',
                        biggestmistake:'',successtory:'',funfact:'',watchoutfor:'',notoverlook:'',joinmonthibm:'',
                        joinyearibm:'',joinmonthikea:'',joinyearikea:'',birthday:'',birthmonth:'',
                        anniversarymonth:'',anniversaryday:'',
                        facebooklink:'',twitterlink:'',linkedinlink:'',instagramlink:''
                     }
                });
        }
        
		
        
        function createEmployee() {
            vm.dataLoading = true;
            EmployeeService.Create($scope.employee)
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
