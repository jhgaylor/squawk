(function() {
  var Q = require('q');
  var twilio = require('twilio')
  var twilioClientHash = {};

  function makeRouter (Models) {
    var router = require('express').Router();
    function processIncomingTwilioMessage (req, res) {
      var data = req.body;
      console.log('\n\n\n=========');
      console.log(data);
      console.log('=========\n\n\n');
      res.sendStatus(200);
    }
    router.route('/incoming')
      .post(processIncomingTwilioMessage);

    return router;
  }

  module.exports = makeRouter;
})();
