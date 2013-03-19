'use strict';

var QRCode = require('qrcode');

module.exports = function(req, res){
	QRCode.toDataURL('http://10.0.10.143:4000/demo.html',function(err,url){
		res.send('<div><h2>Edward Jiang</h2><img src="' + url + '"></div>');
	});
};