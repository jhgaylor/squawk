var Squawk = angular.module('squawk');
Squawk.factory('currentUserService', ['$http', '$rootScope', function($http, $rootScope) {
  var currentUser = {};
  var currentUserService = {
    set: setCurrentUser,
    get: getCurrentUser,
    login: login,
    logout: logout
  };

  function setCurrentUser (newUser) {
    // if the two objects are the same, do nothing
    if (_(currentUser).isEqual(newUser)) { return; }
    console.log('setting to', newUser);
    currentUser = newUser;
    $rootScope.$broadcast('currentUser:updated', currentUser);
  }

  function getCurrentUser () {
    return currentUser;
  }

  function login (number) {
    console.log('http://squawk:4000/users/' + number);
    $http.get('http://squawk:4000/users/' + number)
      .then(function(res) {
        setCurrentUser(res.data.data);
      });
  }

  function logout () {
    setCurrentUser(null);
  }

  return currentUserService;
}]);
