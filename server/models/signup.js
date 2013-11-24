'use strict';

var nohm = require('nohm').Nohm;

/**
* Model: Signup
*/



var SignupSchema = {
  properties: {
    'chineseName': { type: 'string' },
    'englishName': { type: 'string' },
    'nickname': { type: 'string' },
    'role': { type: 'string' },
    'email': { type: 'string' }, // Removed unique key, Should allow one to resubmit mistake signup.
    'mobile': { type: 'string' },
    'weibo': { type: 'string' },
    'site': { type: 'string' }, // array
    'essay': { type: 'string' },
    'rfid': { type: 'string' },
    'status': { type: 'string', index: true },
    'submissionDate': { 
      type: 'timestamp', 
      defaultValue: (function() { return (Date.now()); }),
    }
  },
  methods: {
  }
};

/*
SignupSchema.virtual('id').get(function() {
  return this._id.toHex{ type: 'string' }();
});
*/
module.exports = nohm.model('Signup', SignupSchema);


