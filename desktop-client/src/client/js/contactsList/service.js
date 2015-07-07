var Squawk = angular.module('squawk');
Squawk.factory('contactsListService', ['$http', '$rootScope', 'currentUserService',
  function($http, $rootScope, currentUserService) {
    var contactsList = [];
    var intervalHandle = null;
    var contactsListService = {
      create: create,
      refresh: refresh,
      start: start,
      stop: stop
    };

    function create (opts) {
      $http.post('http://squawk:4000/contacts', opts)
        .then(function(res) {
          refresh();
        });
    }

    function setContactList (newList) {
      // if the two objects are the same, do nothing
      if (_(contactsList).isEqual(newList)) { return; }
      contactsList = newList;
      $rootScope.$broadcast('contactsList:updated', contactsList);
    }

    function refresh () {
      var currentUser = currentUserService.get();
      var ownerId = currentUser._id;
      if (!ownerId) { return; }
      $http.get('http://squawk:4000/contacts?ownerId=' + ownerId)
        .then(function(res) {
          setContactList(res.data.data);
        });
    }

    // poll the web service every 15 seconds
    // TODO: use a streaming mechanism instead
    function start () {
      contactsListService.refresh();
      intervalHandle = setInterval(function() {
        contactsListService.refresh();
      }, 15000);
    }

    function stop () {
      clearInterval(intervalHandle);
    }

    start();

    return contactsListService;
  }
]);
