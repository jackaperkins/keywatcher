var Tail = require('tail').Tail;
var tail = new Tail('/var/log/keystroke.log');

var express = require('express');
var app = express();

var db = require('./db.js');
var notify = require('./notify.js');


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
    checkDanger();
  }, 1000 * 60);

  tail.on("line", function(data) {
    count++;
  });

  // ------ server portion

  app.get('/minutes', function (req, res) {
    db.get(function (err, data) {
      if (err) return res.status(500).send("crap :(");
      res.json(data);
    })
  });

  app.use(express.static('public'));

  app.listen(8080);
});

function checkDanger () {
  db.get(function (err, data) {
    var count = 0;
    for (var i = 0; i < 5; i++) {
      count += data[i].count;
    }

    if(count / 5 > 60) {
      notify.danger("Typing too damn fast!");
    }
  });
}
