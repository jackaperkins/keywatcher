var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('keylogger');

db.serialize(function() {
  //db.run("CREATE TABLE minutes (time TEXT, count INTEGER)");

  var stmt = db.prepare("INSERT INTO minutes VALUES ($time, $count)");
  for (var i = 0; i < 10; i++) {
      stmt.run({
        $time: "boop",
        $count: 2
      });
  }
  stmt.finalize();

  db.each("SELECT * FROM minutes", function(err, row) {
      console.log(row);
  });
});

db.close();
