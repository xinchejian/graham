'use strict';

var nohm = require('nohm').Nohm;

/**
* Model: Badges
*/
var BadgeSchema = {
  properties: {
	'name' : { type: 'string' },
	'icon' : { type: 'string' },
	'url' : { type: 'string' }
  },
  methods: {
  }
};

// BadgeSchema.virtual('id').get(function() {
//   return this._id.toHexString();
// });

module.exports = nohm.model('Badges', BadgeSchema);
