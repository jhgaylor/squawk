
var Squawk = angular.module('squawk', []);

Squawk.factory('activeContactService', ['$rootScope', function($rootScope) {
  var activeClient = null;
  var activeContactService = {
    set: setActiveClient,
    get: getActiveClient,
  };

  function setActiveClient (client) {
    // if the two objects are the same, do nothing
    if (_(client).isEqual(activeClient)) { return; }
    activeClient = client;
    $rootScope.$broadcast('activeContact:updated', activeClient);
  }

  function getActiveClient () {
    return activeClient;
  }

  return activeContactService;
}]);

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

function asTwilioNumber (number) {
  if (number.length < 10) {
    return false;
  }
  if (number.length === 10) {
    return '+1' + number;
  } else if (number.length === 11) {
    return '+' + number;
  } else {
    return number;
  }
}
