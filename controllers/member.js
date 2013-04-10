'use strict';

var Member = require('../models/member.js');
var Shadow = require('../models/shadow.js');
var mailer = require('../modules/mailer');
var chbs   = require('../modules/chbs');
// var Payment = require(../models/payment.js');
// 
exports.index = function(req, res){
	Member.find().exec(function(err, result){
		if(err) {return res.send(err);}
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
		Member.findOne({'_id': data._id}).exec(function(err, mbr){
			if(err) {return res.send(err);}
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
	}else if(query.updatePassword){
		// Reject not matched new password.
		if(req.body.password !== req.body.confirmPassword){
			return res.send({error: 'New password does not match'});
		}

console.log(req.sessionID,req.session);

		Member.findOne({'_id': data._id}).exec(function(err, mbr){
			if(err) {return res.send(err);}
			console.log(mbr);

			Member.findOne({'_id': req.user._id}).exec(function(err, mbr){
				if(err) {return res.send(err);}
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
		var updateData = {
			role: data.role
		};

		//just a boolean, it cannot succeed if the record never existed
		//    not sure if it belongs here OR in the models under schema
		Member.update({'_id': data._id},updateData, function(err,result) {
		  if(err) {return res.send({error: err.message});}
			res.send(result);
		});

	}
};

exports.show = function(req, res){
	Member.findOne({'_id':req.params.member}).exec(function(err, result){
		if(err) {return res.send(err);}
		res.send(result);
	});
};

exports.destroy = function(req, res){
	Member.remove({'_id':req.params.member}).exec(function(err){
		if(err) {return res.send(err);}
		res.send({id:req.params.member});
	});
};