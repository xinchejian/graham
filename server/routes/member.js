'use strict';
/*
 * Routing for members
 */

var member = require('../controllers/member');

// This file must match client/scripts/services/members.js
module.exports = function(app){
	//  These first are following the express-resource convention:
	app.get('/member/:member', member.show);
	app.del('/member/:member', member.destroy);
	app.get('/member', member.index);
	// These are non-REST method invocations:
	app.post('/member/:member/resetPassword', member.resetPassword);
	app.post('/member/:member/updatePassword', member.updatePassword);
	app.post('/member/:member/updateRole', member.updateRole);
}
