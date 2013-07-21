'use strict';

var nodemailer = require('nodemailer');
var config = require('../../config.js');
var sendingAddress = 'XinCheJian Membership <membership@xinchejian.com>';


exports.sendResetPasswordEmail = function(user, password){

  var transport = nodemailer.createTransport('SMTP', config.smtp);

  var mailOptions = {
    from    : sendingAddress,
    to      : user.email,
    subject : 'Hello',
    text    : 'Hello world',
    html    : '<b>Hello world</b>, your new password is ' + password
  };

  console.log(mailOptions);

// send mail with defined transport object
  transport.sendMail(mailOptions, function(error, response){
    if(error) {
      console.log(error);
    }else {
      console.log(response.message);
    }
    transport.close(); // shut down the connection pool, no more messages
  });
};