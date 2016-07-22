var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('keylogger');

var controller = module.exports = {
  init: function (callback) {
  //  db.run("select * from minutes", function (err, data) {
    db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='minutes';", function (err, data) {
      if(err) return callback(err);
      if(typeof data == 'undefined') {
        console.log("making new table");
        return db.run("CREATE TABLE minutes (time TEXT, count INTEGER)", callback);
      } else {
        console.log("all fine");
        return callback();
      }
    });
  },
  store: function (minute, callback) {
      var stmt = db.prepare("INSERT INTO minutes VALUES ($time, $count)");
      stmt.run({
        $time: "boop",
        $count: 2
      });
      stmt.finalize(callback);
  },
  get: function (callback) {
    db.get("select * from minutes LIMIT 50");
  }
};
