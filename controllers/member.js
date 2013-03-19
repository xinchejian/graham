'use strict';

var Member = require('../models/member.js');
// var Payment = require('../models/payment.js');

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
  res.send('create forum');
  console.log('Data in');
  console.log(req);
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