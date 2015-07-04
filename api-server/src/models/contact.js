var mongoose = require('mongoose');

var MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/test';
mongoose.connect(MONGO_URL);

var Contact = mongoose.model('Contact', {
  // user model id. represents whose address book contains
  // this projection of the contact.
  ownerId: Schema.Types.ObjectId,
  name: {
    type: String,
    lowercase: true
  },
  phoneNumber: {
    number: {
      type: String,
      required: true
    },
    type: {
      type: String,
      lowercase: true,
      enum: ['cell', 'home', 'work', 'twilio']
    }
  }
});

module.exports = Contact;
