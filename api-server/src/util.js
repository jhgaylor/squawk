(function() {
  var Q = require('q');
  // TODO: implement

  function processTwilioResponse (message, response) {
    var def = Q.defer();
    // TODO: process the response and return a combined
    //       object.
    message.twilio = response;
    def.resolve(message);
    return def.promise;
  }

  function sendMessageViaTwilio (twilioClient, message) {
    var def = Q.defer();
    // TODO: add MMS support
    twilioClient.sendMessage({
      to: message.to,
      from: message.from,
      body: message.body
    }, function(err, response) {
      if (err) {
        def.reject(err);
        return;
      }
      processTwilioResponse(message, response)
        .then(function(finalMessage) {
          def.resolve(finalMessage);
        }, function(err) {
          def.reject(err);
        });
    });
    return def.promise;
  }

  function makeTwilioNumber (number) {
    if (number.length < 10) {
      return false;
    }
    if (number.length === 10) {
      return '+1' + number;
    } else if (number.length === 11) {
      return '+' + number;
    } else {
      return number;
    }
  }

  module.exports = {
    makeTwilioNumber: makeTwilioNumber,
    twilioSend: sendMessageViaTwilio
  };
})();
