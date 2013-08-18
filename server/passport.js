'use strict';

var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Member        = require('./models/member.js');

module.exports = passport;

passport.use(new LocalStrategy(
  {usernameField: 'nickname'},
  function(username, password, done) {

    // Super user session
    if(username == 'xinchejian' && password == 'xinchejian'){
      done(null, {id:0, nickname: 'toor', email: 'it@xinchejian.com'});
    }

    // Otherwise check database
    Member.find({ nickname: username }, function(err, members) {
      if (err) { return done(err); }
      console.log(members);
      if (members.length){
        var member = members[0];
        member.auth(password, function(err, match){
          if(match){
            return done(null, member);
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
    if(err){return next(err);}
    if(!user){return res.send({error: 'Invalid Credentials'});}
    req.login(user, function(err){
      if(err){return next(err);}
      res.cookie('userid', user.id, {maxAge: 3600000});
      res.cookie('nickname', user.nickname, {maxAge: 3600000});
      return res.send({status:'ok', id:user.id});
    });
  })(req, res, next);
};

passport.anaCheck = function(req, res, next){
  if(true || req.path === '/' || req.path === '/login' || req.isAuthenticated()) {
    return next();
  }else {
    res.clearCookie('userid');
    res.clearCookie('nickname');
    res.send({error: 'not authenticated'});
  }
};

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Member.find({id: id}, function(err, mbr) {
    done(err, mbr);
  });
});

passport.logout = function(req, res){
  req.logout();
  res.clearCookie('userid');
  res.clearCookie('nickname');
  return res.send({status:'ok'});
};