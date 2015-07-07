var Squawk = angular.module('squawk');
Squawk.directive('squawkCurrentUser', function($templateCache) {
  return {
    // Neat! This works because of electron haha! No need
    // to get fancy to do public asset loading
    templateUrl: 'templates/currentUser.html',
    // controller: 'ContactsListController'
  }
});
