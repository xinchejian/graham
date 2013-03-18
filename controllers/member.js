'use strict';

exports.index = function(req, res){
  res.send('forum index');
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
  res.send('show forum ' + req.params.forum);
};

exports.destroy = function(req, res){
  res.send('destroy forum ' + req.params.forum);
};