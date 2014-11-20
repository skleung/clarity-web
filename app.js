var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/clarity-db');

require('./settings.js')(app, express);
require('./routes/index.js')(app, io);

http.listen(3000, function() {
  console.log('Listening at 127.0.0.1:' + 3000);
});
