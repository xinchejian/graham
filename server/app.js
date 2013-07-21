
/**
 * Module dependencies.
 */
'use strict';

var express = require('express'),
  http = require('http'),
  path = require('path'),
  mongoose = require('mongoose'),
  passport = require('./passport'),
  RedisStore = require('connect-redis')(express),
  routes = require('./routes'),
  config = require('./config');

require('express-resource');

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
  app.use(express.session({cookie: {maxAge: 3600000}, store: new RedisStore()}));
  app.use(express.static(path.join(__dirname, 'app')));


  // AnA
  app.use(passport.initialize());
  app.use(passport.session());
  app.all('*', passport.anaCheck);
  app.post('/login', passport.customAuth);
  app.post('/logout', passport.logout);

  // Router after passport
  // See http://stackoverflow.com/questions/10497349/why-does-passport-js-give-me-a-middleware-error
  app.use(app.router);

  // Express-resource Controllers
  app.resource('member', require('./controllers/member'));
  app.resource('application', require('./controllers/application'));

  // Models
  mongoose.connect(config.mongo.url);
  var models = require('./models');
  app.set('models', models);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/qr', require('./controllers/qr'));

http.createServer(app).listen(app.get('port'), function(){
  console.log('server listening on port ' + app.get('port'));
});
