'use strict';

var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Member        = require('./models/member.js');
var crypto        = require('crypto');

module.exports = passport;

var rootUser = {id:0, nickname: 'toor', email: 'it@xinchejian.com'};

passport.use(new LocalStrategy(
  {usernameField: 'nickname'},
  function(username, password, done) {

    // Super user session
    var md5sum = crypto.createHash('md5');
    md5sum.update(password + 'xinchejian');
    var passhash = md5sum.digest('hex');
    if(username == 'Administrator' && passhash == '9f9fd6e21c630357a28bf16c12878fee'){
      done(null, rootUser);
    }

    // Otherwise check database
    Member.findAndLoad({ nickname: username }, function(err, members) {
      if (err) { return done(null, false, {message: err}); }
      if (members.length){
        var member = members[0];
        member.auth(password, function(err, match){
          if(match){
            return done(null, member.allProperties());
          }else {
            return done(null, false, { message: 'Incorrect' });
          }
        });
      }else {
        return done(null, false, { message: 'Incorrect' });
      }
    });
  }
));

passport.customAuth = function(req, res, next){
  passport.authenticate('local', function(err, user){
    console.log(user);
    console.log(err);
    if(err){return next(err);}
    if(!user){ 
      try {
        return res.status(418).send({error: 'Invalid Credentials'});
      } catch(e) {
        console.log(e);
      }
      
    }
    req.login(user, function(err){

      if(err){return next(err);}
      res.cookie('userid', user.id, {maxAge: 3600000});
      res.cookie('nickname', user.nickname, {maxAge: 3600000});
      return res.status(200).send({status:'ok', id:user.id});
    });
  })(req, res, next);
};

passport.anaCheck = function(req, res, next){
  if(true || req.path === '/' || req.path === '/login' || req.isAuthenticated()) {
    return next();
  } else {
    res.clearCookie('userid');
    res.clearCookie('nickname');
    res.status(418).send({error: 'not authenticated'});
  }
};

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  if(id == 0){
    done(null, rootUser);
  }else {
    Member.load(id, function(err, properties) {
      properties.id = id;
      done(err, properties);
    });
  }
});

passport.logout = function(req, res){
  req.logout();
  res.clearCookie('userid');
  res.clearCookie('nickname');
  return res.status(200).send({status:'ok'});
};