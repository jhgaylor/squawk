var Squawk = angular.module('squawk');
Squawk.controller('MessageStreamController', ['$scope', 'messageStreamService',
  function($scope, messageStreamService) {
    $scope.$on('messageStream:updated', function(event, messages) {
      $scope.messages = messages;
    });
    $scope.messages = messageStreamService.get();
  }
]);
