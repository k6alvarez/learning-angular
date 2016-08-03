var myApp = angular.module('myApp' ,['myMod']);
myApp.config(function($provide){
  $provide.value('configTime', new Date());
  $provide.value('runTime', new Date());
  for (var i = 0; i < 1000000000; i++) {
    var y = Math.sqrt(Math.log(i));
  }
});
myApp.run(function(configTime,runTime){
  runTime.setTime((new Date()).getTime());
})
myApp.value('appMsg', 'Hola desde mi app');
myApp.controller('controllerA', ['$scope','appMsg', function($scope,msg) {
  $scope.message = msg;
}]);
myApp.controller('controllerC', ['$scope','configTime','runTime', function($scope,configTime,runTime) {
  $scope.configTime = configTime;
  $scope.runTime = runTime;
}]);
var myMod = angular.module('myMod', []);
myMod.value('modMsg', 'Hola desde mi module');
myMod.controller('controllerB',['$scope','modMsg',function($scope,msg){
  $scope.message = msg;
}])
