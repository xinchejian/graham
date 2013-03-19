'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
* Model: Application
*/
var ApplicationSchema = new Schema({
  'chineseName': String,
  'englishName': String,
  'nickname': String,
  'role': String,
  'email': String,
  'mobile': String,
  'weibo': String,
  'site': [String],
  'essay': String,
  'status': String,
  'submissionDate': Date
});

ApplicationSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

module.exports = mongoose.model('Application', ApplicationSchema);
