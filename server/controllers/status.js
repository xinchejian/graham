'use strict';

var QRCode = require('qrcode');

module.exports = function(req, res){
	QRCode.toDataURL('http://10.0.10.143:4000/demo',function(err,url){
		console.log(url);
		res.send('<div>');
		res.send('<img src="' + url + '">');
		res.send('</div>');
	});
};