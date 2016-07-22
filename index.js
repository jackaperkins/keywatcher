var Tail = require('tail').Tail;
var tail = new Tail('/var/log/keystroke.log');

var express = require('express');
var app = express();

var db = require('./db.js');


// --- keylogger portion
var minutes = [];
var count = 0;

db.init(function (err) {
  if(err) throw err;

  setInterval(function () {
    db.store({
      time: new Date().toISOString(),
      count: count
    });
    count = 0;
    console.log("minute stored");
    db.get(function (err, data) {
      console.log(data);
    });
  }, 1000 * 60);

  tail.on("line", function(data) {
    count++;
  });

  // ------ server portion

  app.get('/minutes', function (req, res) {
    res.json(minutes);
  });

  app.use(express.static('public'));

  app.listen(8080);

});
