var Squawk = angular.module('squawk');
Squawk.directive('squawkContactsList', function($templateCache) {
  return {
    // Neat! This works because of electron haha! No need
    // to get fancy to do public asset loading
    templateUrl: 'templates/contactsList.html',
    controller: 'ContactsListController'
  }
});
