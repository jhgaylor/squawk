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
