
/**
 * Module dependencies.
 */
'use strict';

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , resource = require('express-resource')
  , mongoose = require('mongoose')
  , path = require('path');

var app = express();

app.configure(function(){
  // Port
  app.set('port', process.env.PORT || 4000);

  // Views
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');

  // Express
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('s8hdy3u8qh'));
  app.use(express.session());
  app.use(express.static(path.join(__dirname, 'app')));

  // Router
  app.use(app.router);

  // Express-resource Controllers
  app.resource('member', require('./controllers/member'));
  app.resource('application', require('./controllers/application'));

  // Models
  mongoose.connect('mongodb://localhost/graham');
  var models = require('./models');
  app.set('models', models);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});
var t = require('./controllers/qr');
console.log('hahah');
console.log(t);
app.get('/qr', t);

http.createServer(app).listen(app.get('port'), function(){
  console.log('server listening on port ' + app.get('port'));
});
