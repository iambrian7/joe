/**
 * Created by Brians Desktop on 12/25/2016.
 */
var express = require('express');
var router  = express.Router();
//var stripe = require('stripe')("sk_test_fa4WIVNTFutk2sQZO9AF54jh");
var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// $stripe = array(
//     "secret_key"      => "sk_test_fa4WIVNTFutk2sQZO9AF54jh",
//   "publishable_key" => "pk_test_UWB3Uz5xAWTWkF0BznCORJgb"
// );
var downloads = {
  0: "instructionpicture.docx",
  1: "medicaltemp.docx",
  2: "coldsanta.docx",
  3: "instructionpicture.docx",
  4: "easterbook.docx",
  5: "santastroubles.docx",
  6: "pinkdiamonds.docx",
  7: "coldsanta.docx",
}
// // Routes
router.post('/charge', function (req, res) {
//  console.log('apicharge route...............')
//  console.log(req.body); //This prints the JSON document received (if it is a JSON document)
  // res.json(req.body);
 console.log("key = " +process.env.STRIPE_SECRET_KEY )
// console.log("req.body.purchased: " + JSON.stringify(req.body.purchased))
 var bought = req.body.purchased.split(",")
// console.log("bought: " + bought)
 var downloadsArray = bought.reduce(function(a,k){
 //  console.log("in reduce: k= " + k)
 //  console.log("in reduce: downloads(k)= " + downloads[k])
   return a.concat(downloads[k])
 },[])
 //  console.log("downloadsArray: " + downloadsArray)

  var charge = stripe.charges.create({
    amount: req.body.amount * 100, //1000, // Amount in cents
    currency: "usd",
    source: req.body.stripeToken,
    description: "Donation",
    metadata: {'email': req.body.email,'purchased':req.body.purchased}
  }, function(err, charge) {
    if (err && err.type === 'StripeCardError') {
      // The card has been declined
    //  console.log('charge error.................')
    } else {
      console.log('charge created: ' + JSON.stringify(charge, null, 2))
      res.status(200).json({
        message: 'Welcome to the Writings-by-joe api',
        download: downloadsArray,
        charged: charge
      });
    }
  });


})

module.exports = router;
