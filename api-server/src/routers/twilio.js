(function() {
  var Q = require('q');
  var twilio = require('twilio')
  var twilioClientHash = {};

  function makeRouter (Models) {
    var router = require('express').Router();
    function processIncomingTwilioMessage (req, res) {
      var data = req.body;
      console.log('\n=========');
      console.log(data);
      console.log('=========\n');
      Models.Message.create({
        direction: 'in',
        to: data.To,
        from: data.From,
        body: data.Body,
        state: data.SmsStatus,
        twilio: data
      });
      res.status(200).send('<Response></Response>');
    }
    router.route('/incoming')
      .post(processIncomingTwilioMessage);

    return router;
  }

  module.exports = makeRouter;
})();
