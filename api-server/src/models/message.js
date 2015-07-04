var mongoose = require('mongoose');

var MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/test';
mongoose.connect(MONGO_URL);

var Message = mongoose.model('Message', {
  // user model id. represents which api consumer made the request
  senderId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  direction: {
    type: String,
    enum: ['out', 'in'],
    required: true
  },
  // Phone Number
  to: {
    type: String,
    required: true
  },
  // Phone Number
  from: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  // twilio media data
  mediaUrls: [String],
  sentAt: {
    type: Date,
    default: new Date
  },
  // a hash of to+from+body+sentAt to uniquely identify this message.
  // this is used to prevent duplicate sending of a message.
  hash: {
    type: String,
    required: true
  },
  // echo twilio's canonical state
  state: {
    type: String,
    lowercase: true,
    enum: ['queued', 'sending', 'sent', 'received', 'receiving', 'delivered', 'undelivered', 'failed']
  },
  // blackbox for the twilio response JSON
  twilio: {}
});

module.exports = Message;
