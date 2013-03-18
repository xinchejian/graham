'use strict';

var QRCode = require('qrcode');

module.exports = function(req, res){
	QRCode.toDataURL('i am a pony!',function(err,url){
		console.log(url);
		res.send('<img src="' + url + '">');
	});
};