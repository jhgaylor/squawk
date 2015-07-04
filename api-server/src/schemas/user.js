(function() {
  function makeUserSchema (mongoose) {
    var UserSchema = mongoose.Schema({
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
    return UserSchema;
  }

  module.exports = makeUserSchema;
})();
