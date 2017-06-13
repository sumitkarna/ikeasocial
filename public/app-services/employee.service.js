(function () {
    'use strict';

    angular
        .module('employees')
        .factory('EmployeeService', EmployeeService);

    EmployeeService.$inject = ['$http'];
    function EmployeeService($http) {
        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByEmployeename = GetByEmployeename;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
        service.GetEmployeeDetailsById = GetEmployeeDetailsById;

        return service;

        function GetAll() {
            return $http.get('/view/employees').then(handleSuccess, handleError('Error getting all users'));
        }

        function GetById(id) {
            return $http.get('/api/employees/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

       function GetEmployeeDetailsById(id) {
            return $http.get('/api/employeDetails/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }
        function GetByEmployeename(employeename) {
            return $http.get('/api/employees/' + employeename).then(handleSuccess, handleError('Error getting user by username'));
        }

        function Create(employee) {
            return $http.post('/api/employees', employee).then(handleSuccess, handleError('Error creating user'));
        }

        function Update(employee) {
            return $http.put('/api/employees/' + employee.id, employee).then(handleSuccess, handleError('Error updating user'));
        }

        function Delete(id) {
            return $http.delete('/api/employees/' + id).then(handleSuccess, handleError('Error deleting user'));
        }

        // private functions

        function handleSuccess(res) {
           // alert("I am here");
            return res;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();
