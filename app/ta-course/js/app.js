var myApp = angular.module('myApp' ,['ngMessages', 'ngResource', 'ngRoute']);

myApp.config(function ($routeProvider){
  //lets us specify routes based on the hash in the url
  $routeProvider
    .when('/', {
      templateUrl: 'pages/main.html',
      controller: 'mainController'
    })
    .when('/second/',{
      templateUrl: 'pages/second.html',
      controller: 'secondController'
    })
    .when('/second/:num',{
      templateUrl: 'pages/second.html',
      controller: 'secondController'
    })
    .when('/weather',{
      templateUrl: 'weather/index.html',
      controller: 'weatherAppController'
    })
    .when('/forecast',{
      templateUrl: 'weather/forecast.html',
      controller: 'forcastController'
    })
})

//service - singleton object that will contain properties or functions
//use services to share content across pages
myApp.service('nameService', function() {
  var self = this;
  this.name = 'Jon Doe';

  this.nameLength = function() {
    return self.name.length;
  }
});

myApp.controller('mainController', ['$scope', '$location', '$log', '$filter', '$resource', '$timeout', '$http', 'nameService', function($scope, $location, $log, $filter, $resource, $timeout, $http, nameService){

  $scope.name = "mainController";
  $scope.name = nameService.name;

  $log.main = 'Property from main';
  $log.log($log);
  $log.log($scope);
  $log.log(nameService.name);
  $log.log(nameService.nameLength());
  // $log.info($location.path());

  $scope.$watch('name', function(){
    nameService.name = $scope.name;
  });

}]);

myApp.controller('secondController', ['$scope', '$location', '$log', '$filter', '$resource', '$timeout', '$http', '$routeParams', 'nameService', function($scope, $location, $log, $filter, $resource, $timeout, $http, $routeParams, nameService){

  $scope.name = "secondController";
  $scope.num = $routeParams.num || 'no number';
  $scope.name = nameService.name;

  $log.second = 'Property from second';
  $log.log($log);
  $log.log($scope);
  // $log.info($location.path());

  $scope.$watch('name', function(){
    nameService.name = $scope.name;
  });

}]);



// WEATHER APP
myApp.service('weatherAppCity',function(){
  var self = this;
  this.city = 'Atlanta';
});


myApp.controller('weatherAppController',['$scope', '$location', '$log', '$filter', '$resource', '$timeout', '$http', '$routeParams', 'weatherAppCity', function($scope, $location, $log, $filter, $resource, $timeout, $http, $routeParams, weatherAppCity){
  $scope.name = "weatherAppController";
  $scope.city = weatherAppCity.city;

  $scope.$watch('city', function(){
    weatherAppCity.city = $scope.city;
  });
}]);

myApp.controller('forcastController',['$scope', '$location', '$log', '$filter', '$resource', '$timeout', '$http', '$routeParams', 'weatherAppCity', function($scope, $location, $log, $filter, $resource, $timeout, $http, $routeParams, weatherAppCity){
  $scope.name = "forcastController";
  $scope.city = weatherAppCity.city;

  $scope.weatherApi = $resource("http://api.openweathermap.org/data/2.5/weather", {
    callback: "JSON_CALLBACK"}, {get: {method: "JSONP"}});

  $scope.weatherResult = $scope.weatherApi.get({ q: $scope.city, appid: "0dd966742747c035e481e0b239ebfae8" });

  $scope.convertToFahrenheit = function(degK) {
    return Math.round((1.8 * (degK - 273)) + 32);
  };

  $scope.convertToDate = function(dt) {
    return new Date(dt * 1000);
  };

  $scope.$watch('city', function(){
    weatherAppCity.city = $scope.city;
  });
}]);
