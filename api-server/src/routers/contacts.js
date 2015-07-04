(function() {
  // var Q = require('q');
  // var moment = require('moment');
  // var _ = require('underscore');
  function makeRouter (Models) {
    var router = require('express').Router();
    router.route('/')
      .get(function(req, response) {
        var ownerId = req.query.ownerId;
        var selector = {};
        if (ownerId) {
          selector.ownerId = ownerId;
        }
        Models.Contact.find(selector, function(err, res) {
          response.json({
            data: res
          });
        });
      });
    return router;
  }

  module.exports = makeRouter;
})();
