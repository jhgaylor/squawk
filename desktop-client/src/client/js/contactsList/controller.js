var Squawk = angular.module('squawk');
Squawk.controller('ContactsListController', ['$scope', '$http', 'contactsListService', 'activeContactService',
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
