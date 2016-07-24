var db = require('./db.js');
db.init(function() {
  console.log("adding some rows");
  db.store({
    time: new Date().toISOString(),
    count: 03
  }, function (){
    db.get(function (err, data) {
      console.log("getting some rows:");
      if (err) console.log(err);
      console.log(data);
    });
  });
});
