'use strict';

var Member = require('../models/member.js');
var Shadow = require('../models/shadow.js');
var Badges = require('../models/badges.js');
var mailer = require('../modules/mailer');
var chbs   = require('../modules/chbs');
var async = require('async');

var Payment = require('../models/payment.js');


// need to convert the badges
exports.index = function(req, res){
	Member.findAndLoad({}, function(err, result){
		if(err) {return res.send([]);}
		async.map(result,
			function(r, cb){
				cb(null, r.allProperties());
			},
			function(err, jsonResult){
				res.send(jsonResult);
			}
		);
	});
};
/**
 * Save is handled here too, tl to modify either angular resource or express resource
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.resetPassword = function(req, res){
	var data = req.body;
	console.log("SET PASSWORD DATA", data);
	Member.load(data.id, function(err, properties){
		if(err) {return res.send(418, err);}
		var newPassword = chbs.newPassword();
		this.setPassword(newPassword, function(err, sdw){
			console.log("SET PASSWORD CB" , err, sdw);
			if(err) {
				return res.send(418, err);
			}else {
				properties.id = data.id;
				mailer.sendResetPasswordEmail(properties, newPassword);
				return res.send({status:'ok', id:sdw.memberId});
			}
		});
	});
};

exports.updatePassword = function(req, res){
	var data = req.body;
	// Reject not matched new password.
	if(req.body.password !== req.body.confirmPassword){
		return res.send(418, {error: 'New password does not match'});
	}

	Member.load(data.id, function(err, mbs){
		if(err) {return res.send(418, err);}
		Member.load(req.user.id, function(err, mbr){
			if(err) {return res.send(418, err);}
			var that = this;
			this.auth(req.body.currentPassword, function(err, match) {
				if (match) {
					that.setPassword(req.body.password, function(err, sdw){
						if(err) {
							return res.send(418, err);
						}else {
							return res.send({status:'ok', id:sdw.memberId});
						}
					});
				} else {
					return res.send(418, {error: 'Wrong password'});
				}
			});
		});
	});
};

exports.updateRole = function(req, res){
	var data = req.body;
	//this could probably be changed to update the Member instead of just the role.
	//  here i strip out all extra data and only use the role instead
	var member = new Member();
	member.id = data.id;
	member.p('role', data.role);

	//just a boolean, it cannot succeed if the record never existed
	//    not sure if it belongs here OR in the models under schema
	member.save(function(err) {
		if(err) {
			return res.send(418, {error: err.message});
		}else {
			// Load the member again as angular resource updates its model after REST call
			Member.load(data.id, function(err, loadedMember){
				if(err) {return res.send(418, err);}
				loadedMember.id = req.params.id;
				res.send(loadedMember);
			});
		}
	});
};

exports.updateMember = function(req, res){
	var data = req.body;

	var member = new Member();
	member.id = data.id;

	member.p({
		'chineseName': data.chineseName,
		'englishName': data.englishName,
		'mobile': data.mobile,
		'weibo': data.weibo, 
		'rfid': data.rfid ,
		'email': data.email,
		//'nickname': data.nickname
	});


	//just a boolean, it cannot succeed if the record never existed
	//    not sure if it belongs here OR in the models under schema
	member.save(function(err) {

		if(err) {

			return res.send(418, {error: err});

		} else {
			// Load the member again as angular resource updates its model after REST call
			Member.load(data.id, function(err, loadedMember){
				if(err) {return res.send(err);}
				loadedMember.id = req.params.member;
			
				res.send(loadedMember);
			});
		}
	});
};

exports.show = function(req, res){
	Member.load(req.params.id, function(err, member){
		if(err) {return res.send(418, err);}
		member.id = req.params.id;

		var payment = new Payment();
	

		payment.findAndLoad({
			memberId: member.id
		}, function(err, result){

			if(err) {return res.send(member);}
			async.map(result,
				function(r, cb){
					cb(null, r.allProperties());
				},
				function(err, results){
					member.payments = results;
					res.send(member);
				}
			);
		});


	});
};

exports.terminate = function(req, res){
	/* dont destroy, ever, just set a status flag on them */
	var member = new Member();
	member.id = req.params.id;
	member.p('status', "terminated");

	member.save(function(err) {
		if(err) {return res.send(418, {error: err.message});}
		res.send({id:req.params.id});
	});
};

exports.resurect = function(req, res){
	var member = new Member();
	member.id = req.params.id;
	member.p('status', "ok");

	member.save(function(err) {
		if(err) {
			return res.send(418, {error: err.message});
		} else {
			// Load the member again as angular resource updates its model after REST call
			Member.load(member.id, function(err, loadedMember){
				if(err) {return res.send(418, err);}
				loadedMember.id = req.params.id;
				res.send(loadedMember);
			});
		}
	});
};

exports.listPayments = function(req,res) {

	var member = new Member();
	member.id = req.params.id;
	
	Member.load(member.id, function(err, loadedMember){
		if(err) {return res.send(418, err);}
		// loadedMember.id = req.params.id;

		var data = req.body;
		var payment = new Payment();
		loadedMember.id = member.id;



		payment.findAndLoad({
			memberId: loadedMember.id
		}, function(err, result){
			if(err) {return res.send([]);}
			async.map(result,
				function(r, cb){
					cb(null, r.allProperties());
				},
				function(err, jsonResult){
					res.send(jsonResult);
				}
			);
		});

	

	});
};
exports.deletePayment = function(req, res) {
	var member = new Member();
	member.id = req.params.id;

	Member.load(member.id, function(err, loadedMember){
		if(err) {return res.send(418, err);}
		// loadedMember.id = req.params.id;

		var data = req.body;
		var payment = new Payment();
		payment.id = req.params.paymentid;

		payment.remove({ // options object can be omitted
		  silent: true, // whether remove event is published. defaults to false.
		}, function (err) {
		   exports.listPayments(req, res);
		});


		
	

	});

};
exports.addPayment = function(req, res){
	var member = new Member();
	member.id = req.params.id;
	
	Member.load(member.id, function(err, loadedMember){
		if(err) {return res.send(418, err);}
		// loadedMember.id = req.params.id;

		var data = req.body;
		var payment = new Payment();
		loadedMember.id = req.params.id;

		payment.p({
			memberId: loadedMember.id,
			fee: data.fee.toString(),
			months: data.length,
			paymentDate: data.date

		});

		payment.save(function(err) {
			if (err) return res.send(418, {error: err} );
			payment.load(payment.id, function (err, data) {

				if(err) {return res.send(418, err); }
				res.send(data);

			});
		});
	

	});
};