'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

/**
* Model: Member
*/
var MemberSchema = new Schema({
  'chineseName': String,
  'englishName': String,
  'nickname': String,
  'role': String,
  'email': String,
  'mobile': String,
  'weibo': String,
  'site': [String],
  'payments':[{
    'fee': String,
    'length': String,
    'paymentDate': Date
  }],
  'joinDate': Date
});

MemberSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

MemberSchema.methods.setPassword = function(password, callback){
  var Shadow = require('./shadow.js');
  Shadow.findOne({'_id':this.id}).exec(function(err, shadow){
    if(err){return callback(err);}

    if(!shadow){
      shadow = new Shadow({memberId:this.id});
    }

    bcrypt.genSalt(10, function(err, salt) {
      if (err){
        return callback(err);
      }else {
        bcrypt.hash(password, salt, function(err, hash) {
          shadow.hash = hash;
          shadow.save(function(err, shadow){
            if(err){return callback(err);}
            return callback(null, shadow);
          });
        });
      }
    });
  });
};

MemberSchema.methods.auth = function(password, callback){
  var Shadow = require('./shadow.js');
  Shadow.findOne({'_id':this.id}).exec(function(err, shadow){
    if(err){return callback(err, false);}
    bcrypt.compare(password, shadow.hash, function(err, isPasswordMatch) {
      if (err) {return callback(err, false);}
      else {return callback(null, isPasswordMatch);}
    });
  });
};

module.exports = mongoose.model('Member', MemberSchema);
