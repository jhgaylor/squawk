(function() {
  function makeTwilioNumber (number) {
    if (number.length < 10) {
      return false;
    }
    if (number.length === 10) {
      number = '+1' + number;
    } else if (number.length === 11) {
      number = '+' + number;
    }
    return number;
  }

  module.exports = {
    makeTwilioNumber: makeTwilioNumber
  };
})();
