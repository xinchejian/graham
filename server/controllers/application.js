'use strict';

var Application = require('../models/application.js');
var Member = require('../models/member.js');
var Payment = require('../models/payment.js');

exports.index = function(req, res){
	var status = req.query.status;
	Application.findAndLoad({status:status}, function(err, result){
		if(err) {return res.send(err);}
		res.send(convertToJson(result));
	});
};

function convertToJson(redisResult){
	var result = [];
	for(var index in redisResult){
		console.log(index);
		var converted = {};
		var item = redisResult[index];
		for(var key in item.properties){
			converted[key] = item.properties[key].value;
		}
		result.push(converted);
	}
	return result;
}

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
			Application.find({id: data.id}, function(err, apps){
				if(err) {return res.send(err);}
				var app = apps[0];
				if('approved' === app.status){
					console.log('hal?');
					return res.send({error:'application already approved'});
				}else {
					// Update application status
					app.p('status', 'approved');
					app.save(function(err){
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
	}else { // Application submission
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
	}
};

exports.show = function(req, res){
	Application.find({id:req.params.application}, function(err, result){
		if(err) {return res.send(err);}
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