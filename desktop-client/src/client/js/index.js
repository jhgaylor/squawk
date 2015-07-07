var Squawk = angular.module('squawk', []);

function asTwilioNumber (number) {
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
