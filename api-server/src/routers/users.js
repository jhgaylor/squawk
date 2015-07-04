(function() {
  // var Q = require('q');
  // var moment = require('moment');
  // var _ = require('underscore');
  var util = require('../util');
  function makeRouter (Models) {
    var router = require('express').Router();
    router.route('/')
      .get(nothing)
      .post(createUser);

    router.route('/:number')
      .get(getUserByNumber)
      .put(updateUserByNumber);

    function nothing (req, res) {
      res.json({message: 'There is nothing to see here.'});
    }

    function updateUserByNumber (req, res) {
      var number = util.makeTwilioNumber(req.params.number);
      if (!number) {
        res.status(400).json({
          error: 'Please specify a phone number /users/+15551234567'
        });
        return;
      }
      Models.User.findOneAndUpdate({'twilio.number': number}, {
        $set: req.body
      }, function(err, results) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        res.json({
          success: 'User: ' + number + ' was updated.',
          data: results
        });
      });
    }

    function getUserByNumber (req, res) {
      var number = util.makeTwilioNumber(req.params.number);
      if (!number) {
        res.status(400).json({
          error: 'Please specify a phone number /users/+15551234567'
        });
        return;
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

    function createUser (req, res) {
      Models.User.create(req.body, function(err, results) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        res.status(201).json(results);
      });
    }

    return router;
  }

  module.exports = makeRouter;
})();
