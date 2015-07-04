(function() {
  // var Q = require('q');
  // var moment = require('moment');
  // var _ = require('underscore');
  function makeRouter (Models) {
    var router = require('express').Router();
    router.route('/')
      .get(function(req, response) {
        Models.Contact.find({}, function(err, res) {
          response.json({
            data: res
          });
        });
      });
    return router;
  }

  module.exports = makeRouter;
})();
