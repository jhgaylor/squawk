
var Squawk = angular.module('squawk', []);

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

Squawk.factory('messageStreamService', ['$http', '$rootScope', 'currentUserService', 'activeContactService',
  function($http, $rootScope, currentUserService, activeContactService) {
    var currentUser = currentUserService.get();
    var activeContact = activeContactService.get();
    var messages = [];
    var intervalHandle = null;
    var messageStreamService = {
      refresh: refresh,
      start: start,
      stop: stop,
      send: send,
      get: getMessages
    };

    function getMessages () {
      return messages;
    }

    function setMessages (newMessages) {
      if (_(messages).isEqual(newMessages)) { return; }
      messages = newMessages;
      $rootScope.$broadcast('messageStream:updated', messages);
    }

    function send (to, from, body) {
      var data = {
        to: to,
        from: from,
        body: body
      };
      $http.post('http://squawk:4000/messages', data)
        .then(function(res) {
          console.log('Send Message Response', res);
          refresh();
        });
    }

    function refresh () {
      console.log('Refreshing Messages');
      currentUser = currentUserService.get();
      activeContact = activeContactService.get();
      if (!currentUser || !activeContact) { console.log('Bailing'); return; }
      var url = 'http://squawk:4000/messages?to=' + activeContact.number + '&from=' + currentUser.twilio.number;
      url = url.replace(/\+/g, '');
      $http.get(url)
        .then(function(res) {
          setMessages(res.data.data)
        });
    }

    function start () {
      intervalHandle = setInterval(function() {
        refresh()
      }, 5000)
    }

    function stop () {
      clearInterval(intervalHandle);
    }

    $rootScope.$on('activeContact:updated', function(event, activeContact) {
      refresh();
    });

    start();

    return messageStreamService;
  }
]);

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

Squawk.controller('ContactsController', ['$scope', '$http', 'contactsListService', 'activeContactService',
  function($scope, $http, contactsListService, activeContactService) {
    $scope.$on('contactsList:updated', function(event, contactsList) {
      $scope.contacts = contactsList;
    });
    $scope.$on('activeContact:updated', function(event, activeContact) {
      $scope.activeContact = activeContact;
      console.log('Setting active contact:', $scope.activeContact);
    });
    $scope.activateContact = function activateContact() {
      activeContactService.set(this.contact);
    }
    $scope.createContact = function() {
      console.log(1);
      var activeContact = activeContactService.get();
      console.log(2, activeContact);
      contactsListService.create({
        name: $scope.contactName,
        number: $scope.contactNumber,
        type: 'cell',
        ownerId: activeContact.ownerId
      });
    }
  }
]);

Squawk.controller('MessageStreamController', ['$scope', 'messageStreamService',
  function($scope, messageStreamService) {
    $scope.$on('messageStream:updated', function(event, messages) {
      $scope.messages = messages;
    });
    $scope.messages = messageStreamService.get();
  }
]);

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

Squawk.controller('CurrentUser', ['$scope', 'currentUserService',
  function($scope, currentUserService) {
    $scope.loginAsNumber = '+1650681';
    $scope.$on('currentUser:updated', function(event, currentUser) {
      $scope.currentUser = currentUser;
    });
    $scope.currentUser = currentUserService.get();

    // NOTE: Why do I have to do this? Why doesn't
    //       the model bind to the proper scope?
    $scope.updateScopeWithNumber = function updateScopeWithNumber () {
      $scope.loginAsNumber = this.loginAsNumber;
    };

    $scope.login = function login () {
      var number = $scope.loginAsNumber;
      console.warn(number);
      loginNumber = asTwilioNumber(number);
      if (!loginNumber) { return; }
      currentUserService.login(loginNumber);
    }

    $scope.logout = function logout () {
      currentUserService.logout();
    }
    // currentUserService.login('+16506811396');
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
