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
            alert("i m here")
            vm.dataLoading = true;
            EmployeeService.GetEmployeeDetailsById($rootScope.globals.currentUser.username)
                .then(function (response) {
                var join_date_ibm=new Date(response.data.joinyearibm + "-" + response.data.joinmonthibm);
                var join_date_ikea=new Date(response.data.joinyearikea + "-" + response.data.joinmonthikea);
                var current_date = new Date();
                var total_months_IBM = (current_date.getFullYear() - join_date_ibm.getFullYear())*12 + (current_date.getMonth() - join_date_ibm.getMonth());
                var total_months_IKEA = (current_date.getFullYear() - join_date_ikea.getFullYear())*12 + (current_date.getMonth() - join_date_ikea.getMonth());
                
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
                        yearsinibm:total_months_IBM,
                        yearsinikea: total_months_IKEA,
                        birthday: response.data.birthday,
                        anniversary: response.data.anniversary,
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

         

    }
