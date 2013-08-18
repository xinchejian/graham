'use strict';
/*
 * Routing for members
 */

var member = require('../controllers/member');
console.log(member.create);
module.exports = function(app){
	app.post('/member', member.create);
	app.get('/member/:member', member.show);
	app.put('/member/:member', member.create);
	app.del('/member/:member', member.destroy);
	app.get('/member', member.index);
}