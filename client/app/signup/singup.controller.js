(function () {
    'use strict';

    angular
        .module('app')
        .controller('signUpController', SignUpController);

    SignUpController.$inject = ['$scope'];

	function SignUpController($scope){
    	$scope.firstname = "";
    	$scope.middlename = "";
    	$scope.lastname = "";
    	$scope.save = save;

    	save();

    	function save(){
    		var firstName = $scope.firstname;
    		var middlename = $scope.middlename;
    		var lastname = $scope.lastname;
    	}
    }
})();