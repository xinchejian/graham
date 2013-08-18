'use strict';

var nohm = require('nohm').Nohm;
var bcrypt = require('bcrypt');

/**
* Model: Member
*/
var MemberSchema = {
  properties: {
    'chineseName': { type: 'string' },
    'englishName': { type: 'string' },
    'nickname': { type: 'string', index: true, unique: true },
    'role': { type: 'string' }, //'Member', 'Staff Member', 'Stakeholder', 'Founder' - only these are defined for now
    'email': { type: 'string' },
    'mobile': { type: 'string' },
    'weibo': { type: 'string' },
    'site': { type: 'string' }, //array
    // 'payments':[{
    //   'fee': { type: 'string' },
    //   'length': { type: 'string' },
    //   'paymentDate': { type: 'string' }
    // }],
    'joinDate': { type: 'Timestamp' }, 
    'badges': { type: 'Json' }
  },
  methods: {
    // done below:
  }
};

// MemberSchema.virtual('id').get(function() {
//   return this._id.toHexString();
// });

MemberSchema.methods.setPassword = function(password, callback){
  var Shadow = require('./shadow.js');
  var memberId = this.id;
  console.log(memberId);
  Shadow.find({memberId:memberId}, function(err, shadows){
    if(err){return callback(err);}
    if(!shadows.length){
      shadow = new Shadow({memberId:memberId});
    }else {
      shadow = shadows[0];
    }

    bcrypt.genSalt(10, function(err, salt) {
      if (err){
        return callback(err);
      }else {
        bcrypt.hash(password, salt, function(err, hash) {
          shadow.p('hash', hash);
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
  Shadow.find({memberId:this.id}, function(err, shadows){
    if(err){return callback(err, false);}
    if(!shadows.length){return callback(null, false);}
    var shadow = shadows[0];
    bcrypt.compare(password, shadow.hash, function(err, isPasswordMatch) {
      console.log('Is password match : ', isPasswordMatch);
      if (err) {
        return callback(err, false);
      }else {
        return callback(null, isPasswordMatch);
      }
    });
  });
};

module.exports = nohm.model('Member', MemberSchema);
