// Controller for the poll list
function EmployeeListCtrl($scope, Employee) {
	$scope.employee = Employee.query();
}


// Controller for creating a new employee
function EmployeeNewCtrl($scope, $location, Employee) {
	// Define an empty poll model object
	$scope.employee={
		firstname: '',
		lastname:''
	};
	
	alert("I am here");
	// Validate and save the new Employee to the database
	$scope.createEmployee = function() {
		alert("Inside create");

		var employee = $scope.employee;
		
		// Check that a question was provided
		if(employee.firstname.length > 0) {
			if(employee.lastname.length > 0){
				// Create a new poll from the model
				var newEmployee = new Employee(employee);
				
				// Call API to save poll to the database
				newEmployee.$save(function(p, resp) {
					if(!p.error) {
						// If there is no error, redirect to the main view
						//need change 
						$location.path('polls');
					} else {
						alert('Could not create employee');
					}
				});

			}else{
				alert('You must enter a Last Name');
			}
			
		} else {
			alert('You must enter a First Name');
		}
	};
}
