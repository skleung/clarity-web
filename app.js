var http = require('http');
var express = require('express');
var app = express();
var nconf = require('nconf');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/callback-newsfeed-db');

var server = http.createServer(app);

nconf.argv().env().file({ file: 'local.json' });

require('./settings.js')(app, express);
require('./routes.js')(app);

server.listen(process.env.PORT || nconf.get('port'));
console.log('Listening at 127.0.0.1:' + nconf.get('port'));
