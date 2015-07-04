(function() {
  function getSchemas (mongoose) {
    return {
      User: require('./user')(mongoose),
      Contact: require('./contact')(mongoose),
      Message: require('./message')(mongoose)
    };
  }
  module.exports = getSchemas;
})();
