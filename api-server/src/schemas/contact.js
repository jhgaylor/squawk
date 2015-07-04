(function() {
  function makeContactSchema (mongoose) {
    var ContactSchema = mongoose.Schema({
      // user model id. represents whose address book contains
      // this projection of the contact.
      ownerId: mongoose.Schema.Types.ObjectId,
      name: {
        type: String
      },
      number: {
        type: String,
        required: true
      },
      type: {
        type: String,
        lowercase: true,
        enum: ['cell', 'home', 'work', 'twilio']
      }
    });
    return ContactSchema;
  };

  module.exports = makeContactSchema;
})();
