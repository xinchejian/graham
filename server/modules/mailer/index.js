'use strict';


var path           = require('path')
  , templatesDir   = path.resolve(__dirname, '..', '..', 'views','templates');


var nodemailer = require('nodemailer');
var config =  require(path.resolve(__dirname, '..',  '..', 'config.js'));//require('../../config.js');
var sendingAddress = 'XinCheJian Membership <'+config.smtp.auth.user+'>';
var moment = require('moment');

exports.sendResetPasswordEmail = function(user, password){

  var transport = nodemailer.createTransport('SMTP', config.smtp);

  var mailOptions = {
    from    : sendingAddress,
    to      : user.email,
    subject : 'members.xinchejian.com',
    text    : 'Hello Xinchejian, your new password is: '+ password,
    html    : '<b>Hello XinCheJian</b>, your new password is: ' + password
  };



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


exports.sendPaymentAddEmail = function(user, payment){


  payment.expiryDate = moment(payment.paymentDate).add('months', payment.months).format("dddd, MMMM Do YYYY");

  var transport = nodemailer.createTransport('SMTP', config.smtp);

  var mailOptions = {
    from    : sendingAddress,
    to      : user.email,
    subject : 'members.xinchejian.com',
    text    : 'Hello '+user.nickname+',  _'+payment.fee+'rmb_ has been added to your membership, your membership expires on: _'+ payment.expiryDate+'_ ',
    html    : '<b>Hello '+user.nickname+'</b>,  <strong> '+payment.fee+'rmb</strong> has been added to your membership. <br /> Your membership expires on:<strong> ' +payment.expiryDate +'</strong>'
  };



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

exports.memberShipReminders = function(users){


  
};



