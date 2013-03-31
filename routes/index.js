'use strict';
/*
 * GET home page.
 */

exports.index = function(req, res){
	var Member = res.app.get('models').member;
	var m = new Member({'nick_name': 'hello', 'email': 'hello@world.com'});
	m.save(function (err, obj){
		if(err) {console.log(err);}
		console.log(obj);
	});
	res.render('index', { title: 'Express' });
};
