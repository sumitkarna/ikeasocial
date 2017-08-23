angular.module('employees')
        .controller('ProfileUpdationController', ProfileUpdationController);


// Controller for updating a new employee
ProfileUpdationController.$inject = ['EmployeeService', 'UserService','$location', '$rootScope', '$scope','FlashService','Upload'];
    function ProfileUpdationController(EmployeeService,UserService, $location, $rootScope, $scope,FlashService,Upload) {
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
                        anniversarymonth:response.data.anniversarymonth,
                        facebooklink: response.data.facebooklink,
                        instagramlink: response.data.instagramlink,
                        twitterlink: response.data.twitterlink,
                        linkedinlink: response.data.linkedinlink,
                        profilephotos: "",
                        croppedDataUrl: ""
                    };
               


                EmployeeService.GetEmployeePhotoById($rootScope.globals.currentUser.username).then(
                            function (response) {
                                $scope.employee.profilephoto = 
                                'data:image/jpeg;base64,' + _arrayBfrToBase64(response.data.img.data.data);
                              
                            }

                        )

                        
                         });
        }

   vm.upload = upload;
// upload on file select or drop 
   function upload(photofiles,emailaddr) {
      
 Upload.upload({
          url:'/upload/photosUpdate',
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
        function updateEmployee() {
            vm.dataLoading = true;
            EmployeeService.Update($scope.employee)
                .then(function (response) {
                    if (response.data.success) {
                        upload($scope.employee.croppedDataUrl, $scope.employee.emailaddr);
                        $location.path('/employee/'+response.data.emailaddr);
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        }

        function _arrayBfrToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}
    }
