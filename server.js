'use strict';

var app;
var webPage;

var express = require('express');
var fs      = require('fs');
var http    = require('http');
var path    = require('path');

var herokuHost = 'todomvc-reactive-aspen.herokuapp.com';
var host       = isProduction ? herokuHost : 'localhost';

var fiveMin      = 5 * 60 * 1000;
var httpConfig   = { host: host };
var isProduction = !!(process.env.NODE_ENV === 'production');
var port         = process.env.PORT || 4000;
var utf8         = { encoding: 'utf8' };

if (!isProduction) {
  httpConfig.port = port;
}

function exitProcess() {
  process.exit();
}

function onStart() {
  console.log('Server running on port ' + port + '.');
  preventHerokuSleep();
}

function pingHeroku() {
  http.get(httpConfig);
}

function preventHerokuSleep() {
  setInterval(pingHeroku, fiveMin);
  console.log('Pinging app to prevent spin-down.');
}

app = express();
webPage = fs.readFileSync('./public/index.html', utf8);

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function (req, res) {
  res.send(webPage);
});

process.on('SIGINT',  exitProcess);
process.on('SIGTERM', exitProcess);

app.listen(port, onStart);
