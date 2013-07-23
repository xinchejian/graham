'use strict';

var Member = require('../models/member.js');
var Shadow = require('../models/shadow.js');
var Badges = require('../models/badges.js');
var mailer = require('../modules/mailer');
var chbs   = require('../modules/chbs');
// var Payment = require(../models/payment.js');
// need to convert the badges
exports.index = function(req, res){
	Member.find(function(err, result){
		if(err) {return res.send(err);}
		console.log(result);
		res.send(result);
	});
};
/**
 * Save is handled here too, tl to modify either angular resource or express resource
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.create = function(req, res){
	var data = req.body;
	var query = req.query;
	if(query.resetPassword){
		Member.find({id: data.id}, function(err, mbrs){
			if(err) {return res.send(err);}
			var mbr = mbrs[0];
			var newPassword = chbs.newPassword();
			mbr.setPassword(newPassword, function(err, sdw){
				if(err) {
					return res.send(err);
				}else {
					mailer.sendResetPasswordEmail(mbr, newPassword);
					return res.send({status:'ok', id:sdw.memberId});
				}
			});
		});
	}
	else if(query.updatePassword){
		// Reject not matched new password.
		if(req.body.password !== req.body.confirmPassword){
			return res.send({error: 'New password does not match'});
		}

		Member.find({id: data.id}, function(err, mbrs){
			if(err) {return res.send(err);}
			console.log(mbrs);

			Member.find({id: req.user.id}, function(err, mbr){
				if(err) {return res.send(err);}
				var mbs = mbrs[0];
				mbr.auth(req.body.currentPassword, function(err, match) {
					if (match) {
						mbr.setPassword(req.body.password, function(err, sdw){
							if(err) {
								return res.send(err);
							}else {
								return res.send({status:'ok', id:sdw.memberId});
							}
						});
					} else {
						return res.send({error: 'Wrong password'});
					}
				});
			});
		});
	} else if (query.updateRole) {
		//this could probably be changed to update the Member instead of just the role.
		//  here i strip out all extra data and only use the role instead
		var member = new Member();
		member.id = data.id;
		member.p('role', data.role);

		//just a boolean, it cannot succeed if the record never existed
		//    not sure if it belongs here OR in the models under schema
		member.save(function(err) {
		  if(err) {return res.send({error: err.message});}
			res.send(member);
		});

	}
};

exports.show = function(req, res){
	Member.find({id:req.params.member}, function(err, result){
		if(err) {return res.send(err);}
		res.send(result);
	});
};

exports.destroy = function(req, res){
	/* dont destroy, ever, just set a status flag on them */
	var member = new Member();
	member.id = req.params.member;
	member.p('status', "terminated");

	member.save(function(err) {
		if(err) {return res.send({error: err.message});}
		res.send({id:req.params.member});
	});

};