var myApp = angular.module('myApp' ,['ngMessages', 'ngResource']);

// myApp.controller('mainController', function($scope, $log, $filter, $resource){
//   //new controller created
//
//   //scope service
//   $scope.name = 'Juan Alvarez';
//   $scope.occupation = 'Farmer';
//
//   //angular $log service
//   $log.log("hola");
//   $log.info("Some Information");
//   $log.debug("Debug info for my code.");
//   $log.warn("Ay pendejo, te doy un warning");
//   $log.error("You fucked up big time man.");
//
//   //angular $resource module for interacting with RESTful services.
//   $log.log($resource);
//
//
//
// });

// always use this version of dependency injections so that minifiers don't
// break your code. Angular will match the elements of the array with the
// parameters of the function so that must be in the same order.
myApp.controller('mainController', ['$scope', '$log', '$filter', '$resource', '$timeout', function($scope, $log, $filter, $resource, $timeout){

  //scope service
  $scope.name = 'Juan Alvarez';
  $scope.occupation = 'Farmer';

  $timeout(function () {
    $scope.name = 'Speedy Gonzalez';
  }, 1500);

  $scope.handle = '';

  $scope.lowercasehandle = function () {
    return $filter('lowercase')($scope.handle)
  }

  $scope.characters = 5;

  $scope.rules = [
    { rulename: "rule 1", severity="death"},
    { rulename: "rule 2", severity="forgiveness"},
    { rulename: "rule 3", severity="wealth"}
  ]

}]);
