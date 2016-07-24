const notifier = require('node-notifier');

// Object
var c = module.exports = {
  danger: function(message) {
    notifier.notify({
      'title': 'DANGER',
      'message': message
    });
  }
}
