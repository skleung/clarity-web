var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var uristring = process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || "mongodb://localhost/clarity-db";
var port = process.env.PORT || 3000

var mongoose = require('mongoose');
mongoose.connect(uristring, function (err, res) {
  if (err) {
  console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
  console.log ('Succeeded connected to: ' + uristring);
  }
});

io.on("connection", function(ws) {
  var id = setInterval(function() {
    ws.send(JSON.stringify(new Date()), function() {  })
  }, 1000)

  console.log("websocket connection open")

  io.on("close", function() {
    console.log("websocket connection close")
    clearInterval(id)
  })
});

require('./settings.js')(app, express);
require('./routes/index.js')(app, io);

http.listen(port, function() {
  console.log('Listening at 127.0.0.1:' + port);
});
