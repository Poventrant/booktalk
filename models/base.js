var tools = require('../common/tools');

module.exports = function (schema) {
  schema.methods.create_ago = function () {
  	
    return tools.Date.formatDate(this.create, true);
  };

  schema.methods.update_ago = function () {
    return tools.Date.formatDate(this.update, true);
  };
};
