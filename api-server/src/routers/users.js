(function() {
  // var Q = require('q');
  // var moment = require('moment');
  // var _ = require('underscore');
  function makeRouter (Models) {
    var router = require('express').Router();
    router.route('/')
      .get(nothing);

    router.route('/:number')
      .get(getUserByNumber);

    function nothing (req, res) {
      res.json({message: 'There is nothing to see here.'});
    }

    function getUserByNumber (req, res) {
      var number = req.params.number;
      if (!number || number.length < 10) {
        res.status(400).json({
          error: 'Please specify a phone number /users/+15551234567'
        });
        return;
      }
      if (number.length === 10) {
        number = '+1' + number;
      } else if (number.length === 11) {
        number = '+' + number;
      }

      Models.User.findOne({'twilio.number': number}, function(err, user) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        if (user) {
          res.json({data: user});
          return;
        }
        res.status(404).json({
          error: 'No user matching the specified number was found. Please register.'
        });
      });
    }

    return router;
  }

  module.exports = makeRouter;
})();
