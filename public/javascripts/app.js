// Angular module, defining routes for the app
angular.module('employees', ['ngCookies','ngRoute','googlechart']).
	config(['$routeProvider', function($routeProvider) {
		$routeProvider.
			when('/employee', { templateUrl: 'employeelist/employeeList.html', controller: EmployeeListCtrl , controllerAs: 'vm'}).
			when('/login', { templateUrl: 'login/login.view.html', controller: LoginController, controllerAs: 'vm'}).
            when('/new', { templateUrl: 'profilecreation/profilecreation.html', controller: ProfileCratioinController,controllerAs: 'vm'}).
            when('/update', { templateUrl: 'updateprofile/updateprofile.html', controller: ProfileUpdationController,controllerAs: 'vm'}).
            when('/register', { templateUrl: 'register/register.view.html', controller: RegisterController, controllerAs: 'vm' }).
			when('/employee/:employeeId', { templateUrl: 'viewemployeedetail/employeeDetail.html', controller: EmployeeDetailController, controllerAs: 'vm' }).

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
  }).run(run);

 
run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
    function run($rootScope, $location, $cookies, $http) {
        // keep user logged in after page refresh
         $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }
       
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }