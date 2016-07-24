const notifier = require('node-notifier');
var path = require('path');

// Object
var c = module.exports = {
  danger: function(message) {
    notifier.notify({
      title: 'DANGER',
      message: message,
      icon: path.join(__dirname, 'handcrush.png')
    });
  }
}
