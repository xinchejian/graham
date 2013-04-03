'use strict';

var QRCode = require('qrcode');
//more qr crap needed in modules
var fs = require('fs')
	,Canvas = require('canvas')
	,Image = Canvas.Image;

module.exports = function(req, res){
	var xcjqr = {};
	var q = {};
	var effect = 'xcj';


// qr crap to make the magic .. scroll down.. a long way!
	xcjqr.xcj = function(args,cb){
		args.logo = process.cwd()+'/app/images/xcj.png';
		this.image(args,cb);
	};

	xcjqr.image = function(args,cb){

		var src = args.logo||'';

		var img = new Image();
		img.onload = function(){
			QRCode.draw(args.text||'',function(err,canvas){
				if(err) {
					cb(err,false);
					return;
				}


				var stage = new Canvas(canvas.width,canvas.width)
				, ctx = stage.getContext('2d');
				
				//scale image
				var w = canvas.width;
				var h = canvas.height;
				
				//scale the image to our desired size! ninja!
				
				var logo_w = 50; //output width
				var logo_h = 50; //output height
				if (img.width > logo_w || img.height > logo_h) {

					if (img.width > img.height) {
						//wider than longer 100x50
							var ratio = logo_w / img.width;
							w = logo_w;
							h = img.height * ratio;

					} else if (img.height > img.width) {
						//longer than wider 50x100
							var ratio = logo_h / img.height;
							w = img.width * ratio;
							h = logo_h;
					} else {
						//fuck yeah! easy one 50x50
						w = logo_w;
						h = logo_h;
					}

				};


				//draw background
				var qr = new Image;
				qr.src = canvas.toBuffer();
				ctx.drawImage(qr, 0, 0);
				//draw forground.. aka logo
				ctx.drawImage(img,canvas.width/2-(w/2),canvas.height/2-(h/2),w,h); //centered
				cb(false,stage);//callback dude!
			});
		};
		
		img.onerror = function(error){
			error.message += ' ('+src+')';
			cb(error,null);
		}
		
		img.src = src;
	};



	
	q.text = "http://10.0.10.143:4000/demo.html";
	q.errorCorrectLevel = "max";
	xcjqr[effect](q,function(error,canvas){
		res.send('<div><h2>Paul Adams</h2><img src="' + canvas.toDataURL() + '"></div>');
	})



};

   

