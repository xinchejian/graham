'use strict';

var nohm = require('nohm').Nohm;

/**
* Model: Shadow
*/
var ShadowSchema = {
  properties: {
	'memberId': { type: 'string', index: true },	// objectid
	'hash': { type: 'string' },
	'updateDate': { type: 'timestamp' }
  }
};

// ShadowSchema.virtual('id').get(function() {
//   return this._id.toHexString();
// });

module.exports = nohm.model('Shadow', ShadowSchema);
