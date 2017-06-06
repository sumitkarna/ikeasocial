// Angular module, defining routes for the app
angular.module('employees', ['ngCookies','ngRoute','googlechart','employeeServices']).
	config(['$routeProvider', function($routeProvider) {
		$routeProvider.
     	when('/employee', { templateUrl: 'partials/list.html', controller: EmployeeListCtrl }).
			when('/employees', { templateUrl: 'partials/list.html', controller: EmployeeListCtrl }).
			when('/login', { templateUrl: 'login/login.view.html', controller: LoginController, controllerAs: 'vm'}).
      when('/new', { templateUrl: 'profilecreation/profilecreation.html', controller: ProfileCratioinController,controllerAs: 'vm'}).
      when('/register', { templateUrl: 'register/register.view.html', controller: RegisterController, controllerAs: 'vm' }).
     when('/home', { templateUrl: 'home/home.view.html', controller: HomeController, controllerAs: 'vm' }).
    // when('/home', { templateUrl: 'partials/new.html', controller: EmployeeNewCtrl}).
			when('/employee/:employeeId', { templateUrl: 'partials/employeeDetail.html', controller: EmployeeDetailItemCtrl }).

			// If invalid route, just redirect to the main list view
			otherwise({ redirectTo: '/login' });
	}]).directive('orgchart', function() {
      return {
		  
        restrict: 'E',
        link: function($scope, $elm) {

          // Instantiate and draw our chart, passing in some options.
 var chart = new google.visualization.OrgChart($elm[0]);
          chart.draw($scope.orgChartData);
		  
        }
    }
  });

 
