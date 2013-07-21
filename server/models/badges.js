'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
* Model: Badges
*/
var BadgeSchema = new Schema({
	'name' : String,
	'icon' : String,
	'url' : String
});

BadgeSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

module.exports = mongoose.model('Badges', BadgeSchema);
