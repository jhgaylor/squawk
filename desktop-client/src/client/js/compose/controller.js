Squawk.controller('ComposeController', ['$scope', 'currentUserService', 'activeContactService', 'messageStreamService',
  function($scope, currentUserService, activeContactService, messageStreamService) {
    $scope.sendSMS = function sendSMS () {
      var currentUser = currentUserService.get();
      var activeContact = activeContactService.get();
      var to = activeContact.number;
      var from = currentUser.twilio.number;
      var body = $scope.outgoingText;
      if (!body) {
        console.log('Not sending empty body');
        return;
      }
      messageStreamService.send(to, from, body);
      $scope.outgoingText = '';
    }
  }
]);
