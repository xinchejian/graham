'use strict';

var Application = require('../models/application.js');

exports.index = function(req, res){
	Application.find().exec(function(err, result){
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
	if(data.nickname && data.mobile && data.email && data.essay){
		data.submissionDate = new Date();
		var application = new Application(req.body);
		application.save(function(err, saved){
			if (err) {return res.send(err);}
			res.send({id:saved.id});
		});
	}else {
		res.send({error: 'Required fields not filled up'});
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