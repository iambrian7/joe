/**
 * Created by Brians Desktop on 1/14/2017.
 */
var express = require('express');
var helper = require('sendgrid').mail
var router = express.Router({mergeParams: true});


router.get('/', function (req, res, next) {
  res.render('email/send-email2.hbs');
});
router.post('/', function (req, res, next) {
  var d = new Date();
  var timeStamp = d.toLocaleTimeString() + " " + d.toLocaleDateString()
  from_email = new helper.Email("bkcgee@gmail.com")
  to_email = new helper.Email("bkcgee@gmail.com")
  subject = "Comment from WritingsByJoe.com"
  var c = "Name: " + req.body.name + "<br> From: " + req.body.email + "<br>" + req.body.comment + '<br> at ' + timeStamp;
  content = new helper.Content("text/html", c);
  mail = new helper.Mail(from_email, subject, to_email, content)

 var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
  var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  });

  sg.API(request, function(error, response) {
    if (error) {
      return res.send("Problem Sending Email!!!!");
    }
    res.status(200).json({
      message: 'Welcome to WritingsByJoe.org'
    });

  })
});
module.exports = router;
