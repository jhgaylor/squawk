// Called: var models = require('models')(mongoose);
(function() {

  function makeModels (mongoose) {
    var Schemas = require('./schemas/schemas')(mongoose);
    var models = {
      User: mongoose.model('User', Schemas.User),
      Contact: mongoose.model('Contact', Schemas.Contact),
      Message: mongoose.model('Message', Schemas.Message),
    };
    return models;
  }

  module.exports = makeModels
})();
