var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var WebAPIUtils = require('../utils/WebAPIUtils');
var Store = require('../stores/Store');

var ActionTypes = Constants.ActionTypes;

module.exports = {

  createLabel: function(label) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.CREATE_LABEL,
      label: label
    });
    WebAPIUtils.createLabel(label);
  }

};
