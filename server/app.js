
/**
 * Module dependencies.
 */
'use strict';

var express = require('express'),
  http = require('http'),
  path = require('path'),
  passport = require('./passport'),
  RedisStore = require('connect-redis')(express),
  routes = require('./routes'),
  config = require('./config'),
  redis = require('redis'),
  nohm = require('nohm').Nohm,
  compass = require('node-compass');

require('express-resource');

var app = express();

app.configure(function(){
  // Port
  app.set('port', process.env.PORT || 4000);
  var redis_client = redis.createClient(config.redis.port, config.redis.host);

  // Views
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');

  // Express
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('s8hdy3u8qh'));
  var session_store = new RedisStore({client: redis_client});
  app.use(express.session({cookie: {maxAge: 3600000}, store: session_store}));
  app.use(express.static(path.join(__dirname, 'app')));


  // sass/scss auto compiler with compass


  app.configure(function() {
      app.use(compass({
        project: path.join(__dirname, '/app'), 

        config_file: 'config.rb'
      }));
  });



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
  redis_client.on("connect", function() {
    console.log("Connected to redis");
    nohm.logError = function(err) { if (err) { console.dir(err); console.trace("nohm.logError");}};
    nohm.setClient(redis_client);
    // Redis/Nohm sanity check
    var Test = nohm.model('Test', {
      properties:{x:{type:'string'},y:{type:'string'}},
      methods:{x:function(){return this.p('x');}}
    });
    var test = new Test();
    test.p('x', 'Nohm works fine');
    var a = test.hello;
    test.save(function (err) {
      console.log(err || test.x());
    });
  });
  
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
