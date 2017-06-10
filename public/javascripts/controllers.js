
var empapp= angular
        .module('employees');
        empapp.controller('EmployeeListCtrl', EmployeeListCtrl);
		//empapp.controller('EmployeeDetailItemCtrl', EmployeeDetailItemCtrl);
		//empapp.controller('EmployeeNewCtrl', EmployeeNewCtrl);
		empapp.controller('OrgCtrl',OrgCtrl);

// Controller for the poll list
function EmployeeListCtrl($scope, Employee) {
	$scope.employees = Employee.query();
}

// Controller for an individual Employee
/*
function EmployeeDetailItemCtrl($scope, $routeParams, socket, Employee) {	
	$scope.employee = Employee.get({employeeId: $routeParams.employeeId});
}*/

// Controller for creating a new employee
/*function EmployeeNewCtrl($scope, $location, Employee) {
	// Define an empty poll model object
	$scope.employee={
		name: '',role:'',basedin:'',emailaddr:'',team:'',phone:'',aboutme:'',biggestmistake:'',
		successtory:'',funfact:'',watchoutfor:'',notoverlook:'',yearswithibm:'',yearswithikea:'',
		facebooklink:'',linkedinlink:'',twitterlink:'',instagramlink:''
	};

	// Validate and save the new Employee to the database
	$scope.createEmployee = function() {

		var employee = $scope.employee;

		if(employee.name.length > 0) {
			if(employee.role.length > 0){
				if(employee.basedin.length>0){
					if(employee.emailaddr.length>0){
						if(employee.team.length>0){
							// Create a new employee from the model
							var newEmployee = new Employee(employee);

							// Call API to save poll to the database
							newEmployee.$save(function(p, resp) {
							if(!p.error) {
								// If there is no error, redirect to the main view
								//need change
								$location.path('/home');
							} else {
									alert('Could not create employee');
							}
							});

						}else{
							alert('You must enter your team');
						}

					}else{
						alert('You must enter email address');
					}

				}else{
					alert('You must enter where you are located');
				}
			}else{
				alert('You must enter a role');
			}
		}else {
			alert('You must enter a Name');
		}
	};
}*/

function OrgCtrl($scope, $http) {
	alert("Inside orgCtrl");
	$http.get('data.json').success( function(result) {
		alert("sucess!!");
		console.log("sucess");
    $scope.chart = {
      type: "OrgChart",
      data: result
    };
  }).error(function(){
	   $scope.chart = {
      type: "OrgChart",
      data: "Error"
    };
  });
}