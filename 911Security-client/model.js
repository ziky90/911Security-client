function CrimeCtrl($scope) {
  $scope.crimes=[];
 
  $scope.addHelp = function(report) {
    report.picture=false;
    $scope.crimes.push(report);
  };
  
  $scope.addReport = function(report){
    report.pisture=false;
    $scope.crimes.push(report);
  
  };
  
  $scope.addPhoto = function(report){
    report.picture=true;
    $scope.crimes.push(report);
  };
  
  
  $scope.ban = function(crimeSelected){
    var oldCrimes = $scope.crimes;
    $scope.crimes = [];
    angular.forEach(oldCrimes, function(crime) {
      if (crime.id != crimeSelected.id){
        $scope.crimes.push(crime);
      }
    });
    sendBan(crimeSelected.id);
  };
  
  $scope.solve = function(crimeSelected){
    var oldCrimes = $scope.crimes;
    $scope.crimes = [];
    angular.forEach(oldCrimes, function(crime) {
      if (crime.id != crimeSelected.id){
        $scope.crimes.push(crime);
      }
    });
    sendSolve(crimeSelected.id);
  };
 
}


function MessageCtrl($scope){
  $scope.messages = [];
  
  $scope.addMessage = function(message){
    $scope.messages.push(message);
  };
  
  $scope.cleanMessages = function(){
    $scope.messages = []; 
  };
  
}
