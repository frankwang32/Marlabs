var app = angular.module("myApp", ['ngRoute', 'RankCtrl', 'PlayerAdminCtrl', 'TeamAdminCtrl']); 


app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider.
      when("/home", {
        templateUrl: "pages/index.html",
        activetab: "home"
      }).
      when("/rank", {
        templateUrl: "pages/rank.html",
        controller: 'RankCtrl',
        activetab: "rank"
      }).
      when("/playerAdmin", {
        templateUrl: "pages/playerAdmin.html",
        controller: 'PlayerAdminCtrl',
        activetab: "playerAdmin"
      }).
      when("/teamAdmin", {
        templateUrl: "pages/teamAdmin.html",
        controller: 'TeamAdminCtrl',
        activetab: "teamAdmin"
      }).
      otherwise( { redirectTo: "/home"});
    $locationProvider.html5Mode({enabled: true, requireBase: false});
  }]);