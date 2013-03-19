'use strict';

var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Member        = require('./models/member.js');

module.exports = passport;

passport.use(new LocalStrategy(
  function(username, password, done) {
    Member.findOne({ nickname: username }, function(err, member) {
      if (err) { return done(err); }
      if (member){
        member.auth(password, function(err, match){
          if(match){
            return done(null, member);
          }else {
            return done(null, false, { message: 'Incorrect' });
          }
        });
      }
    });
  }
));