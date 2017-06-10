angular.module('employees')
        .controller('EmployeeDetailController', EmployeeDetailController);


// Controller for creating a new employee
EmployeeDetailController.$inject = ['EmployeeService', '$location', '$rootScope', '$scope','FlashService'];
    function EmployeeDetailController(EmployeeService, $location, $rootScope,$scope, FlashService) {
        var vm = this;
		$scope.employee={
		name: '',role:'',basedin:'',emailaddr:'',team:'',phone:'',aboutme:'',biggestmistake:'',
		successtory:'',funfact:'',watchoutfor:'',notoverlook:'',yearswithibm:'',yearswithikea:'',
		facebooklink:'',linkedinlink:'',twitterlink:'',instagramlink:''
	};
       vm.GetEmployeeById = GetEmployeeById;
       $scope.init = GetEmployeeById;

        function GetEmployeeById() {
            vm.dataLoading = true;
            EmployeeService.GetEmployeeDetailsById($rootScope.globals.currentUser.username)
                .then(function (response) {
                    $scope.employee=response;
                    if (response.success) {
                        FlashService.Success('Employee detail successful', true);
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        }
    }