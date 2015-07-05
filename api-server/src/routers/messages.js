(function() {
  var Q = require('q');
  var moment = require('moment');
  // var _ = require('underscore');
  var util = require('../util');
  var twilio = require('twilio')
  var twilioClientHash = {};

  // given a user that is known to have a complete set
  // twilio creds, get a working client, memoized client
  function getTwilioClient (user) {
    var number = user.number;
    var twilioClient = twilioClientHash[number];
    if (twilioClient) { return twilioClient; }
    twilioClient = twilio(user.twilio.accountSID, user.twilio.authToken);
    twilioClientHash[number] = twilioClient;
    return twilioClient;
  }

  function makeRouter (Models) {
    var router = require('express').Router();
    router.route('/')
      .get(getMessages)
      .post(createMessage);

    function createMessage (req, res) {
      var data = req.body;
      var now = moment().toDate();
      // will be used to hold a reference to the message
      // object. it's dirty but makes life easier.
      console.log(data);
      var message = null;
      var messageObj = {
        direction: 'out',
        to: data.to,
        from: data.from,
        body: data.body,
        sentAt: now,
      };
      Models.Message.create(messageObj)
        .then(getUserFromMessage, reportError)
        .then(sendMessageViaTwilio, report404)
        .then(storeFinalMessage, reportError)
        .then(reportSuccess, reportError);

      function storeFinalMessage (finalMessage) {
        console.log(finalMessage);
        return Models.Message.findOneAndUpdate({_id:finalMessage._id}, finalMessage).exec();
      }

      function getUserFromMessage (_message) {
        message = _message;
        if (!message) {
          throw new Error(404);
          return;
        }
        return Models.User.findOne({'twilio.number': message.from}).exec();
      }

      // returns a promise to send via twilio
      function sendMessageViaTwilio (user) {
        if (!user) { reportError(); return;}
        var twilioClient = getTwilioClient(user);
        // uses the closed on value of message
        return util.twilioSend(twilioClient, message)

      }
      function reportSuccess (finalMessage) {
        res.json({
          data: finalMessage,
          success: 'Successfully sent SMS to Twilio.'
        });
      }

      function reportError (err) {
        console.error(err && err.stack);
        res.sendStatus(500);
      }
      function report404 (err) {
        res.sendStatus(404);
      }
    }

    function getMessages (req, res) {
      var to = util.makeTwilioNumber(req.query.to);
      var from = util.makeTwilioNumber(req.query.from);
      console.log(to, from);
      if (!to || !from) {
        res.status(400).json({
          error: 'Please specify "to" and "from" query parameters in the form of +16621234567'
        });
        return;
      }
      var messagesPromise = Models.Message.find({
        to: to,
        from: from
      }).exec();
      messagesPromise.then(function(data) {
        res.json({
          data: data
        });
      }, function(err) {
        res.sendStatus(500);
      });
    }

    return router;
  }

  module.exports = makeRouter;
})();
