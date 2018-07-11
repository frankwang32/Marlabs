// app.service('multipartForm', ['$http', function($http){
// 	this.post = function(uploadUrl, data){
// 		var fd = new FormData();
// 		for(var key in data)
// 			fd.append(key, data[key]);
// 		$http.post(uploadUrl, fd, {
// 			transformRequest: angular.indentity,
// 			headers: { 'Content-Type': undefined }
// 		});
// 	}
// }])
app.service('fileUpload', ['$http', function ($http) {
        this.uploadFileToUrl = function(file, uploadUrl,data){
           var fd = new FormData();
           fd.append('file', file);
           for(var key in data)
              fd.append(key, data[key]);
           $http.post(uploadUrl, fd, {
              transformRequest: angular.identity,
              headers: {'Content-Type': undefined}
           })
           .success(function(){
           })
           .error(function(){
           });
        }
     }]);