(function() {
  // var Q = require('q');
  // var moment = require('moment');
  // var _ = require('underscore');
  function makeRouter (Models) {
    var router = require('express').Router();
    router.route('/')
      .get(function(req, res) {
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
      })
      .post(function(req, res) {
        Models.Contact.create(req.body, function(err, results) {
          if (err) {
            res.sendStatus(500).end();
            return;
          }
          res.json(results);
        });
      });
    return router;
  }

  module.exports = makeRouter;
})();
