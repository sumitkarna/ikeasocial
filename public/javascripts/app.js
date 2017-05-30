// Angular module, defining routes for the app
angular.module('employee', ['employeeServices']).
	config(['$routeProvider', function($routeProvider) {
		$routeProvider.
			when('/employee', { templateUrl: 'partials/list.html', controller: EmployeeListCtrl }).
			when('/new', { templateUrl: 'partials/new.html', controller: EmployeeNewCtrl }).
			// If invalid route, just redirect to the main list view
			otherwise({ redirectTo: '/employee' });
	}]);
	