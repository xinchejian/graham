
/**
 * Module dependencies.
 */
'use strict';

var express = require('express'),
  morgan = require('morgan'), //the replacement for express.logger
  bodyParser = require('body-parser'), //instead of express.bodyParser
  cookieParser = require('cookie-parser'), //instead of express.cookieParser
  methodOverride = require('method-override'), //instead of methodOverride
  errorHandler  = require('errorhandler'),
  http = require('http'),
  path = require('path'),
  passport = require('./passport'),
  session = require('express-session'),
  RedisStore = require('connect-redis')(session),
  routes = require('./routes'),
  config = require('./config'),
  redis = require('redis'),
  nohm = require('nohm').Nohm,
  compass = require('node-compass');

var app = express();

var env = process.env.NODE_ENV || 'development';


// Port
app.set('port', process.env.PORT || 4000);
//redis
var redis_client = redis.createClient(config.redis.port, config.redis.host);

// Views
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
// Express
app.use(morgan('dev'));//progbably want apache style logging later with morgan('combined')
app.use(bodyParser()); //replacement for express.bodyParser()
app.use(methodOverride()); //replacement for express.methodOverride()
app.use(cookieParser('s8hdy3u8qh')); //replacement for express.cookieParser()

var session_store = new RedisStore({client: redis_client});
app.use(session({ store: session_store, secret: 's8hdy3u8qh' }))
app.use(express.static(path.join(__dirname, 'app')));

// sass/scss auto compiler with compass

app.use(compass({
  project: path.join(__dirname, '/app'), 
  config_file: 'config.rb'
}));


// AnA
app.use(passport.initialize());
app.use(passport.session());
app.all('*', passport.anaCheck);
app.post('/login', passport.customAuth);
app.post('/logout', passport.logout);

// Include route
require('./routes/member')(app);
require('./routes/signup')(app);
// app.resource('signup', require('./controllers/signup'));

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
  test.p('x', 'saf');
  var a = test.hello;
  test.save(function (err) {
    console.assert(test.x() === 'saf');
    test.remove(function(err){console.log(err || "Nohm works fine");});
  });
});


var models = require('./models');
app.set('models', models);




if ('development' == env) {
   app.use(errorHandler());
}



http.createServer(app).listen(app.get('port'), function(){
  console.log('server listening on port ' + app.get('port'));
});
