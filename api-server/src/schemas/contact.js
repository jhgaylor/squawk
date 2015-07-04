(function() {
  function makeContactSchema (mongoose) {
    var ContactSchema = mongoose.Schema({
      // user model id. represents whose address book contains
      // this projection of the contact.
      ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      number: {
        type: String,
        required: true
      },
      name: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        lowercase: true,
        enum: ['cell', 'home', 'work', 'twilio', 'unknown'],
        default: 'unknown'
      }
    });
    return ContactSchema;
  };

  module.exports = makeContactSchema;
})();
