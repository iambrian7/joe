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
  // res.render('email/send-email2.hbs');
  //  var helper = require('sendgrid').mail
  var d = new Date();
  var timeStamp = d.toLocaleTimeString() + " " + d.toLocaleDateString()
 // console.log('email sending...............')
  //console.log(req.body); //This prints the JSON document received (if it is a JSON document)
  from_email = new helper.Email("bkcgee@gmail.com")
  to_email = new helper.Email("bkcgee@gmail.com")
  subject = "Comment from WritingsByJoe.com"
  var c = "Name: " + req.body.name + "<br> From: " + req.body.email + "<br>" + req.body.comment + '<br> at ' + timeStamp;
 // content = new helper.Content("text/plain", c);
  content = new helper.Content("text/html", c);
  mail = new helper.Mail(from_email, subject, to_email, content)
//console.log('api=' + process.env.SENDGRID_API_KEY)


 var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
  // console.log('sendgrid.env = ' + sendgrid.env.SENDGRID_API_KEY);
  // var sg = require('sendgrid')('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');
  //var sg = require('sendgrid')('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');


  var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  });

  sg.API(request, function(error, response) {
   // console.log(response.statusCode)
   // console.log(response.body)
   // console.log(response.headers)
    // res.send('done................')
    if (error) {
      return res.send("Problem Sending Email!!!!");
    }
    res.status(200).json({
      message: 'Welcome to WritingsByJoe.org'
    });

  })
});
module.exports = router;

// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     req.session.oldUrl = req.url;
//     res.redirect('/user/signin');
// }