'use strict';

var app;
var webpage;

var express = require('express');
var fs      = require('fs');
var http    = require('http');
var path    = require('path');

var herokuHost   = 'todomvc-reactive-aspen.herokuapp.com';
var isProduction = !!(process.env.NODE_ENV === 'production');
var host         = isProduction ? herokuHost : 'localhost';

var fiveMin    = 5 * 60 * 1000;
var httpConfig = { host: host };
var port       = process.env.PORT || 5000;
var utf8       = { encoding: 'utf8' };

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
  //http.get(httpConfig);
}

function preventHerokuSleep() {
  setInterval(pingHeroku, fiveMin);
  console.log('Pinging app to prevent spin-down.');
}

app = express();
webpage = fs.readFileSync('./public/index.html', utf8);

app.use(express.static(path.join(__dirname, 'public'), { index: webpage }));

app.get('/', function (req, res) { res.send(webpage); });

process.on('SIGINT',  exitProcess);
process.on('SIGTERM', exitProcess);

app.listen(port, onStart);
