'use strict';

var Application = require('../models/application.js');
var Member = require('../models/member.js');
var Payment = require('../models/payment.js');
var async = require('async');

exports.index = function(req, res){
	var status = req.query.status;
	Application.findAndLoad({status:status}, function(err, result){
		//console.log(err, result);
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
	// Application submission
	if(data.nickname && data.mobile && data.email && data.essay){
		data.submissionDate = new Date();
		data.status = 'pending';
		var application = new Application();
		application.p(data);
		application.save(function(err){
			if(err) {
				return res.send(err);
			}
			res.send({id:application.id});
		});
	}else {
		res.send({error: 'Required fields not filled up'});
	}
};

exports.update = function(req, res) {
	var data = req.body;
	var query = req.query;
	if(query.approve){ // Application approval
		if(data.nickname && data.mobile && data.email && data.rfid && data.payment && data.payment.fee && data.payment.length){

			// Prevent duplicate approval
			Application.load(data.id, function(err, properties){
				if(err) {return res.send(err);}
				if('approved' === properties.status){
					return res.send({error:'application already approved'});
				}else {
					// Update application status
					this.p('status', 'approved');
					this.save(function(err){
						if(err) {return res.send(err);}
						// Create member
						data.joinDate = new Date();
						data.role = 'member';
						var payment = data.payment;
						payment.paymentDate = new Date();
						data.payments = [payment];
						var member = new Member();
						member.p(data);
						member.save(function(err){
							if(err) {return res.send(err, member);}
							res.send({status:'ok', id:member.id});
						});
					});
				}
			});

		}else {
			res.send({error: 'Required fields not filled up'});
		}
	}
};

exports.show = function(req, res){
	Application.load(req.params.application, function(err, result){
		if(err) {return res.send(err);}
		result.id = req.params.application;
		res.send(result);
	});
};
exports.terminate = function(req, res) {
	/* dont destroy, ever, just set a status flag on them */
	console.log("terminator");
	var application = new Application();
	application.id = req.params.application;
	application.p('status', "terminated");
	application.save(function(err) {
		if(err) {return res.send({error: err.message});}
		res.send({id:req.params.application});
	});
};
exports.activate = function(req, res) {
	/* dont destroy, ever, just set a status flag on them */
	console.log("activator");
	var application = new Application();
	application.id = req.params.application;
	application.p('status', "approved");
	application.save(function(err) {
		if(err) {return res.send({error: err.message});}
		res.send({id:req.params.application});
	});
};
exports.approve = function(req, res) {
	/* dont destroy, ever, just set a status flag on them */
	console.log("approver");
	var application = new Application();
	application.id = req.params.application;
	application.p('status', "approved");
	application.save(function(err) {
		if(err) {return res.send({error: err.message});}
		res.send({id:req.params.application});
	});
};
exports.destroy = function(req, res){
	/* dont destroy, ever, just set a status flag on them */
	var application = new Application();
	application.id = req.params.application;
	application.p('status', "rejected");
	application.save(function(err) {
		if(err) {return res.send({error: err.message});}
		res.send({id:req.params.application});
	});

};