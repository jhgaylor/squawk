(function() {
  // var Q = require('q');
  // var moment = require('moment');
  // var _ = require('underscore');
  function makeRouter (Models) {
    var router = require('express').Router();
    router.route('/')
      .get(function(req, res) {
        res.json({message: 'hooray! welcome to our clients api endpoint!'});
      });
    return router;
  }

  module.exports = makeRouter;
})();
