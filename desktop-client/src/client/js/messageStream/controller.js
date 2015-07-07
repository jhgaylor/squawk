var Squawk = angular.module('squawk');
Squawk.controller('MessageStreamController', ['$scope', 'messageStreamService', 'activeContactService',
  function($scope, messageStreamService, activeContactService) {
    $scope.$on('messageStream:updated', function(event, messages) {
      $scope.messages = messages;
    });
    $scope.$on('activeContactService:updated', function(event, activeContact) {
      $scope.activeContact = activeContact;
    });
    $scope.messages = messageStreamService.get();
    $scope.activeContact = activeContactService.get();
  }
]);
