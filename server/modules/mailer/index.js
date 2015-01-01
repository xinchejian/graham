'use strict';


var path           = require('path')
  , templatesDir   = path.resolve(__dirname, '..', '..', 'views','templates');


var nodemailer = require('nodemailer');
var config =  require(path.resolve(__dirname, '..',  '..', 'config.js'));//require('../../config.js');
var sendingAddress = 'XinCheJian Membership <'+config.smtp.auth.user+'>';
var moment = require('moment');

exports.sendResetPasswordEmail = function(user, password){

  var nodemailer = require('nodemailer');
  var smtpTransport = require('nodemailer-smtp-transport');
  var transport = nodemailer.createTransport(smtpTransport(config.smtp));


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

  var nodemailer = require('nodemailer');
  var smtpTransport = require('nodemailer-smtp-transport');
  var transport = nodemailer.createTransport(smtpTransport(config.smtp));

  var mailOptions = {
    from    : sendingAddress,
    to      : user.email,
    subject : 'members.xinchejian.com - payment added',
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

exports.justJoinedEmail = function(user){

  var nodemailer = require('nodemailer');
  var smtpTransport = require('nodemailer-smtp-transport');
  var transport = nodemailer.createTransport(smtpTransport(config.smtp));

  var mailOptions = {
    from    : sendingAddress,
    to      : user.email,
    subject : 'members.xinchejian.com - new signup',
    text    : 'Hello '+user.nickname+', your information has been submitted, the next step is as follows: 1, deposit the membership fee in the red box with a note attached on it with your email address. or 2, find a staff member and get them to activate your membership.',
    html    : '<strong>Hello '+user.nickname+',</strong><br /> your information has been submitted, the next step is as follows: <br /><i>1, deposit the membership fee in the red box with a note attached on it with your email address.</i><br /> or <i>2, find a staff member and get them to activate your membership.</i>'
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



