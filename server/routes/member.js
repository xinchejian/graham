'use strict';
/*
 * Routing for members
 */

var member = require('../controllers/member');
var qr = require('../controllers/qr');

// This file must match client/scripts/services/members.js
module.exports = function(app){
	//  These first are following the express-resource convention:
	app.get('/member/:id', member.show);
	//app.del('/member/:id', member.destroy);
	app.get('/member', member.index);
	// These are non-REST method invocations:
	app.post('/member/:id/resetPassword', member.resetPassword);
	app.post('/member/:id/updatePassword', member.updatePassword);
	app.post('/member/:id/updateRole', member.updateRole);
	app.post('/member/:id/terminate', member.terminate);
	app.post('/member/:id/resurect', member.resurect);
	app.post('/member/:id/updateMember', member.updateMember);

	//
	app.post('/member/:id/addPayment', member.addPayment);
	app.delete('/member/:id/removePayment/:paymentid', member.deletePayment);
	//qr url
	app.get('/member/:id/qrcode', qr.index);



}
