'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
* Model: Shadow
*/
var ShadowSchema = new Schema({
  'memberId': Schema.Types.ObjectId,
  'hash': String,
  'updateDate': Date
});

ShadowSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

module.exports = mongoose.model('Shadow', ShadowSchema);
