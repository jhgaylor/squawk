// Called: var models = require('models')(mongoose);
(function() {

  function makeModels (mongoose) {
    var Schemas = require('./schemas/schemas')(mongoose);
    var models = {
      User: mongoose.model('squawk_users', Schemas.User),
      Contact: mongoose.model('contacts', Schemas.Contact),
      Message: mongoose.model('messages', Schemas.Message)
    };
    return models;
  }

  module.exports = makeModels
})();
