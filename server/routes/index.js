'use strict';
/*
 * GET home page.
 */

exports.index = function(req, res){
	var Member = res.app.get('models').member;
	var m = new Member();
	m.p({'nick_name': 'hello', 'email': 'hello@world.com'});
	m.save(function (err){
		if(err) {console.log(err);}
		console.log(m);
	});
	res.render('index', { title: 'Express' });
};
