var teamAdminCtrl = angular.module('TeamAdminCtrl', []);
teamAdminCtrl.controller('TeamAdminCtrl', ['$scope', '$http', 'fileUpload', function($scope, $http, fileUpload) {
    console.log("Hello World from teamAdmin controller");
    var refresh = function() {
	  $http.get('/teamlist').success(function(response) {
	    console.log("I got the data I requested");
	    $scope.teamlist = response;
	    $scope.team = "";
	  });
	};
	refresh();
	$scope.addTeam = function() {
	  var file = $scope.myFile;
      var data = $scope.team;
      var uploadUrl = "/teamlist";
      fileUpload.uploadFileToUrl(file, uploadUrl, data);
	  refresh();
	}
	
	$scope.remove = function(id) {
	  console.log(id);
	  $http.delete('/teamlist/' + id).success(function(response) {
	    refresh();
	  });
	};

	$scope.edit = function(id) {
	  console.log(id);
	  $http.get('/teamlist/' + id).success(function(response) {
	    $scope.team = response;
	  });
	};  

	$scope.update = function() {
	  console.log($scope.team._id);
	  $http.put('/teamlist/' + $scope.team._id, $scope.team).success(function(response) {
	    refresh();
	  })
	};

	$scope.deselect = function() {
	  $scope.team = "";
	}

}]);