angular.module('employees')
	.controller('EmployeeListCtrl', EmployeeListCtrl);

// Controller for creating a new employee
EmployeeListCtrl.$inject = ['EmployeeService', '$location', '$rootScope', '$scope', 'FlashService'];
function EmployeeListCtrl(EmployeeService, $location, $rootScope, $scope, FlashService) {
	var vm = this;
	vm.allEmployees = [];
	initController();
	function initController() {
            loadAllEmployees();
        }
		 function loadAllEmployees() {
            EmployeeService.GetAll()
                .then(function (employees) {
                    vm.allEmployees = employees;
                });
        }
}