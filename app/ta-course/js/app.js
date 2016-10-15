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
