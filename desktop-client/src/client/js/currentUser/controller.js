var Squawk = angular.module('squawk');
Squawk.controller('CurrentUser', ['$scope', 'currentUserService',
  function($scope, currentUserService) {
    $scope.$on('currentUser:updated', function(event, currentUser) {
      $scope.currentUser = currentUser;
    });
    $scope.currentUser = currentUserService.get();
    $scope.loginOptions = {
      number: '+1650681'
    };

    $scope.login = function login () {
      var number = $scope.loginOptions.number;
      console.warn(number);
      loginNumber = asTwilioNumber(number);
      if (!loginNumber) { return; }
      currentUserService.login(loginNumber);
    }

    $scope.logout = function logout () {
      currentUserService.logout();
    }
    currentUserService.login('+16506811396');
  }
]);
