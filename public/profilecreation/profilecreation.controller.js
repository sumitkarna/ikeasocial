angular.module('employees')
        .controller('ProfileCratioinController', ProfileCratioinController);


// Controller for creating a new employee
ProfileCratioinController.$inject = ['EmployeeService','UserService', '$location', '$scope','$rootScope', 'FlashService','Upload'];
    function ProfileCratioinController(EmployeeService,UserService, $location, $scope,$rootScope, FlashService,Upload) {
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
                        facebooklink:'',twitterlink:'',linkedinlink:'',instagramlink:'',profilephoto:'',croppedDataUrl:''

                     }
                });
        }
      vm.upload = upload;
// upload on file select or drop 
   function upload(photofiles,emailaddr) {
      
 Upload.upload({
           //url: 'http://localhost:2000/uploadjavatpoint',
          url:'/upload/photos',
            headers : {
            'Content-Type': 'multipart/form-data'
        },
         //data:{images:photofiles, username: "jyothi"}
         file: Upload.dataUrltoBlob(photofiles, emailaddr)
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
      
       
    }


        function createEmployee() {
            vm.dataLoading = true;
            EmployeeService.Create($scope.employee)
                .then(function (response) {
                    if (response.data.success) {
                       // upload($scope.employee.profilephoto);
                        upload($scope.employee.croppedDataUrl, $scope.employee.emailaddr);
                       // $location.path('/employee/'+response.data.emailaddr);
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        }

        
    }
