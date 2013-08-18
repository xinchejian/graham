'use strict';

var nohm = require('nohm').Nohm;

/**
* Model: Payment
*/
var PaymentSchema = {
	properties: {
	  'fee': { type: 'string' },
	  'months': { type: 'integer' },
	  'memberId': { type: 'string', ref: 'Member'},
	  'paymentDate': { type: 'timestamp' }
	},
	methods: {
	}
};

// PaymentSchema.virtual('id').get(function() {
//   return this._id.toHexString();
// });

module.exports = nohm.model('Payment', PaymentSchema);
