
var empapp= angular
        .module('employees');
		empapp.controller('OrgCtrl',OrgCtrl);

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