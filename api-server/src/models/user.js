var mongoose = require('mongoose');

var MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/test';
mongoose.connect(MONGO_URL);

// TODO: figure out auth. for now, just entering the right number
//       at the login screen is sufficient.
var User = mongoose.model('User', {
  profile: {
    firstName: String,
    lastName: String,
    email: String
  },
  joinedAt: {
    type: Date,
    default: new Date
  },
  twilio: {
    // represent the number that the user can send messages from
    // via the Twilio api
    number: String,
    // API credentials
    accountSID: String,
    authToken: String
  }
});

module.exports = User;
