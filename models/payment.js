'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
* Model: Payment
*/
var PaymentSchema = new Schema({
  'fee': String,
  'length': String,
  'memberId': {type: Schema.Types.ObjectId, ref: 'Member'},
  'paymentDate': Date
});

PaymentSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

module.exports = mongoose.model('Payment', PaymentSchema);
