var Tail = require('tail').Tail;
var tail = new Tail('/var/log/keystroke.log');
var http = require('http');


var minutes = [];
var count = 0;

setInterval(function () {
  minutes.push(count);
  count = 0;
  console.log("");
  console.log(minutes.length + " minutes recorded so far");
  console.log("last 30 minutes:");
  for (var i = minutes.length -1; i > minutes.length - 30 && i >= 0; i--){
    console.log(minutes[i]);
  }
}, 1000 * 60);

tail.on("line", function(data) {
  //console.log(data);
  count++;
});

var server = http.createServer(function (req, res) {
  res.end("col beans");
});

server.listen(8080);
