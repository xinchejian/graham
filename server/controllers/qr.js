'use strict';
var Member = require('../models/member.js');

var QRCode = require('qrcode');
//more qr crap needed in modules
var fs = require('fs')
	,Canvas = require('canvas')
	,Image = Canvas.Image;





exports.index = function(req, res){
	var data = req.params;
	

	var xcjqr = {};
	var q = {};
	var effect = 'details';


// qr crap to make the magic .. scroll down.. a long way!
	xcjqr.xcj = function(args,cb){
		args.logo = process.cwd()+'/app/images/xcj.png';
		this.image(args,cb);
	};

	xcjqr.details = function(args,cb) {
 
		var canvas = new Canvas(153,243)
		  , ctx = canvas.getContext('2d');
  		ctx.fillStyle = "rgba(255,255,255,1)";
  		ctx.fillRect(-10, -10, 173, 263);
  		ctx.fillStyle = "rgba(0,0,0,1)";

		//since the qrcode has whitespace, it needs to be drawn first
		this.xcj(args, function(error, canvas) {
			var qr = new Image;
			qr.src = canvas.toBuffer();
			ctx.drawImage(qr, -4, 40, 160, 160);

		});
		
		/* append the name */
		ctx.font = 'normal 14pt Verdana';
		var m = ctx.measureText(args.name);
		var size = 14;
		while (m.width > (canvas.width-18)) {
			size--;
			ctx.font = 'normal '+size+'pt Verdana';
			m = ctx.measureText(args.name);
		}
		
		ctx.fillText(args.name, (canvas.width - m.width )/2, 26); //fill proportianally to the width, basically center

		/* warning text */
		// ctx.font = 'normal 8pt Verdana';
		// var m = ctx.measureText("((Scan for Status))");
		// ctx.fillText("((Scan for Status))", (canvas.width - m.width )/2, 188); //fill proportianally to the width, basically center

		/* bullshit text */
		ctx.font = 'normal 15pt Verdana';
		var m = ctx.measureText("MEMBERSHIP");
		ctx.fillText("MEMBERSHIP", (canvas.width - m.width )/2, 222); //fill proportianally to the width, basically center

		/* member join date */
		if (q.date) {
			var betterDate = new Date(q.date);

			var formatedDate = betterDate.getFullYear()+"/"+betterDate.getMonth()+"/"+betterDate.getDate();

			ctx.font = 'normal 6pt Verdana';
			var m = ctx.measureText(formatedDate);
			ctx.fillText(formatedDate,  canvas.width - m.width - 10 , 203); //fill proportianally to the width, basically center
		}


		/* member number */
		ctx.font = 'normal 6pt Verdana';
		var m = ctx.measureText(q.membernumber);
		ctx.fillText(q.membernumber,  (canvas.width - m.width )/2, 232); //fill proportianally to the width, basically center

		cb(false, canvas);
		//


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


	Member.load(data.id, function(err, loadedMember){
		if(err) {return res.send(418, err);}

		loadedMember.id = req.params.id;

		q.name = loadedMember.nickname;
		q.date = loadedMember.joinDate;
		q.membernumber = loadedMember.rfid; //up to 24 characters
		q.text = "http://members.xinchejian.com/#/status/"+loadedMember.rfid;
		q.errorCorrectLevel = "M"; //L, M, Q, H


		xcjqr[effect](q,function(error,canvas){
			res.writeHead(200, {'Content-Type': 'image/png' });
			canvas.toBuffer(function(err, buf){
				res.end(buf);
			});
		});


	});





};

   

