(function() {
  // var Q = require('q');
  // var moment = require('moment');
  // var _ = require('underscore');
  function makeRouter (Models) {
    var router = require('express').Router();
    router.route('/')
      .get(getContacts)
      .post(createContact);

    router.route('/:contactId')
      .put(updateContact)
      .delete(removeContact);

    // Sends all contacts if called with no parameters
    // If an ownerId is specified in the query parameters,
    // then only send the contacts owned by that user.
    function getContacts (req, res) {
      var ownerId = req.query.ownerId;
      var selector = {};
      if (ownerId) {
        selector.ownerId = ownerId;
      }
      Models.Contact.find(selector, function(err, contacts) {
        res.json({
          data: contacts
        });
      });
    }

    // Attempts to take the incoming body and convert it into a
    // contact object. If it succeeds, the object is persisted to the
    // database.
    function createContact (req, res) {
      Models.Contact.create(req.body, function(err, results) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        res.status(201).json(results);
      });
    }

    function updateContact (req, res) {
      var contactId = req.params.contactId;
      if (!contactId) {
        res.status(400).json({
          error: 'Please specify a contactId in the url. /contacts/abc123'
        });
        return;
      }
      Models.Contact.findByIdAndUpdate(contactId, {
        $set: req.body
      }, function(err, results) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        res.json({
          success: 'Contact: ' + contactId + ' was updated.'
        });
      });
    }

    // Note: Any user can delete any contact, not just their own
    function removeContact (req, res) {
      var contactId = req.params.contactId;
      if (!contactId) {
        res.status(400).json({
          error: 'Please specify a contactId in the url. /contacts/abc123'
        });
        return;
      }
      Models.Contact.remove({_id: contactId}, function(err, results) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        var successMessage = 'Remove contact: ' + contactId
        if (results.result.n === 0) {
          successMessage = 'No contact to remove.'
        }
        res.json({
          success: successMessage
        });
      });
    }
    return router;
  }

  module.exports = makeRouter;
})();
