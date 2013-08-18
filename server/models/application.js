'use strict';

var nohm = require('nohm').Nohm;

/**
* Model: Application
*/



var ApplicationSchema = {
  properties: {
    'chineseName': { type: 'string' },
    'englishName': { type: 'string' },
    'nickname': { type: 'string' },
    'role': { type: 'string' },
    'email': { type: 'string' }, // Removed unique key, Should allow one to resubmit mistake application.
    'mobile': { type: 'string' },
    'weibo': { type: 'string' },
    'site': { type: 'string' }, // array
    'essay': { type: 'string' },
    'status': { type: 'string', index: true },
    'submissionDate': { 
      type: 'string', 
      defaultValue: function() { return (Date.now()); },
    }
  },
  methods: {
  }
};

/*
ApplicationSchema.virtual('id').get(function() {
  return this._id.toHex{ type: 'string' }();
});
*/
module.exports = nohm.model('Application', ApplicationSchema);


