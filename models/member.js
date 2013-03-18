'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
* Model: Member
*/
var MemberSchema = new Schema({
  'chineseName': String,
  'englisName': String,
  'nickname': String,
  'role': String,
  'email': String,
  'mobile': String,
  'weibo': String,
  'site': [String],
  'join_date': Date
});

MemberSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

module.exports = mongoose.model('Member', MemberSchema);
