'use strict';

var Application = require('../models/application.js');
var Member = require('../models/member.js');
var Payment = require('../models/payment.js');

exports.index = function(req, res){
	var status = req.query.status;
	Application.find({status:status}).exec(function(err, result){
		if(err) {return res.send(err);}
		res.send(result);
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
	var query = req.query;
	if(query.approve){ // Application approval
		if(data.nickname && data.mobile && data.email && data.rfid && data.payment && data.payment.fee && data.payment.length){

			// Prevent duplicate approval
			Application.findOne({'_id': data._id}).exec(function(err, app){
				if(err) {return res.send(err);}
				if('approved' === app.status){
					console.log('hal?');
					return res.send({error:'application already approved'});
				}else {
					// Update application status
					app.status = 'approved';
					app.save(function(err){
						if(err) {return res.send(err);}
						// Create member
						data.joinDate = new Date();
						data.role = 'member';
						var payment = data.payment;
						payment.paymentDate = new Date();
						data.payments = [payment];
						var member = new Member(data);
						member.save(function(err, m){
							if(err) {return res.send(err, m);}
							res.send({status:'ok', id:m.id});
						});
					});
				}
			});

		}else {
			res.send({error: 'Required fields not filled up'});
		}
	}else { // Application submission
		if(data.nickname && data.mobile && data.email && data.essay){
			data.submissionDate = new Date();
			data.status = 'pending';
			var application = new Application(data);
			application.save(function(err, saved){
				if(err) {
					return res.send(err);
				}
				res.send({id:saved.id});
			});
		}else {
			res.send({error: 'Required fields not filled up'});
		}
	}
};

exports.show = function(req, res){
	Application.findOne({'_id':req.params.application}).exec(function(err, result){
		if(err) {return res.send(err);}
		res.send(result);
	});
};

exports.destroy = function(req, res){
	Application.remove({'_id':req.params.application}).exec(function(err){
		if(err) {return res.send(err);}
		res.send({id:req.params.application});
	});
};