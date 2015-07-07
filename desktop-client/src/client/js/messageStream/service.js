var Squawk = angular.module('squawk');
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
