'use strict';

var Signup = require('../models/signup.js');
var Member = require('../models/member.js');
var Payment = require('../models/payment.js');
var async = require('async');
var mailer = require('../modules/mailer');

exports.index = function(req, res){
	var status = req.query.status;
	console.log(status);
	/* pending not returning true data, bad index? */
	Signup.findAndLoad({status:status}, function(err, result){
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
 * Save, approval, and any other post function are handled here too,
 * tl to modify either angular resource or express resource
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.create = function(req, res){
	var data = req.body;
	// Signup submission
	/* removed  data.mobile request and data.essay bug report #24 */
	if(data.nickname  && data.email){
		data.submissionDate = new Date().getTime();
		data.status = 'pending';
		var signup = new Signup();
		signup.p(data);
		signup.save(function(err){
			if(err) {
				return res.send(418, err);
			}

			mailer.justJoinedEmail(data);
			res.send({id:signup.id});

		});
	}else {
		res.send(418, {error: 'Required fields not filled up'});
	}
};

exports.approve = function(req, res) {
	var data = req.body;
	var query = req.query;
	if(data.nickname && data.mobile && data.email && data.payment && data.payment.fee && data.payment.length){

		// Prevent duplicate approval
		Signup.load(data.id, function(err, properties){
			if(err) {return res.send(418, err);}
			if('approved' === properties.status){
				return res.send(418, {error:'Signup already approved'});
			}else{
				// Update signup status
				this.p('status', 'approved');

				this.save(function(err){
					if(err) {return res.send(418, err);}
					// Create member
					data.joinDate = new Date().getTime();
					data.role = 'Member';

					var paymentInfo = data.payment;
					paymentInfo.paymentDate = new Date().getTime();

					var member = new Member();
					delete data.essay;
					delete data.submissionDate;
					delete data.payment;
					delete data.id;

					member.p(data);
					member.save(function(err){
						if(err) {return res.send(418, err, member);}

						var payment = new Payment();

						payment.p({
							memberId: member.id,
							fee: paymentInfo.fee.toString(),
							months: paymentInfo.length,
							paymentDate: paymentInfo.paymentDate

						});

						payment.save(function(err) {
							if(err) {return res.send(418, err, member);}
							res.send({status:'ok', id:member.id});
						});
					});

				});
			}
		});
	} else {
		res.send(418, {error: 'Required fields not filled up'});
	}
};

exports.show = function(req, res){
	console.log('Show signup is called');
	Signup.load(req.params.id, function(err, result){
		if(err) {return res.send(418, err);}
		result.id = req.params.id;
		res.send(result);
	});
};

exports.activate = function(req, res) {
	var data = req.body;
	/* dont destroy, ever, just set a status flag on them */
	console.log("activator");
	var signup = new Signup();
	signup.id = req.params.id;
	signup.p('status', "approved");
	signup.save(function(err) {
		if(err) {return res.send(418, {error: err.message});}
		res.send({id:req.params.id});
	});
};

exports.destroy = function(req, res){
	/* dont destroy, ever, just set a status flag on them */
	var signup = new Signup();
	signup.id = req.params.id;
	signup.p('status', "rejected");
	signup.save(function(err) {
		if(err) {return res.send(418, {error: err.message});}
		res.send({id:req.params.id});
	});

};