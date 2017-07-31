


    function validateJoes(chkForm){
        console.log("validateJoes loaded.........")
        verifyCard();
    }

var paycard = {};

        paycard.amount = 15;
        // ////////////////////////test data/////////////////////////////////////
        paycard.cardrName = 'Brian Carlson';
        paycard.cardNumber = "4242424242424242";
        paycard.expMonth = '03';
        paycard.expYear = '22';
        paycard.cvc = '232';
        paycard.email = 'bkcgee@gmail.com';
        paycard.stripeToken = null;

         var verifyEvent = new Event('verify-card');
 document.addEventListener('verify-card', function (e) {
     // card has now been verified so the transaction can continue
         chargeTheCard();
         // nextButton.click();
        }, false);
 function chargeTheCard() {
            console.log('charging the card')
            charging();
        }
 function verifyCard() {
            Stripe.card.createToken({
                name: paycard.cardName,
                number: paycard.cardNumber,
                cvc: paycard.cvc,
                exp_month: paycard.expMonth,
                exp_year: paycard.expYear
            }, stripeResponseHandler);
        }
        function stripeResponseHandler(status, response) { // nothing but store stripeToken
            if (response.error) { // Problem!
                paycard.cardError = response.error.message;
                console.log('error in getting Stripe token: ' + JSON.stringify(paycard, null, 4))
//
//    // Show the errors on the form:
//    $form.find('.payment-errors').text(response.error.message);
//    $form.find('.submit').prop('disabled', false); // Re-enable submission
//
            } else { // Token was created!
                paycard.stripeToken = response.id;
                console.log('received Stripe token: ' + JSON.stringify(paycard, null, 4))
                paycard.cardError = null;
            }
            document.dispatchEvent(verifyEvent); // continue error or not
        }

/////////////////  charging the card  /////////////////////

        function ajaxJSONPost(url, jsondata, callback){
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    callback(xhr.responseText);
                }
            }
            xhr.send(JSON.stringify(jsondata));
        }
        function charging() {
            var data = {};
            data.amount =paycard.amount;
            data.name = paycard.cardName
            data.email = "bkcgee@gmail.com"
            // data.address = donateform.address.value
            data.number =  paycard.cardNumber
            data.exp_month = paycard.expMonth
            data.exp_year = paycard.expYear
            data.cvc = paycard.cvc
            data.stripeToken = paycard.stripeToken;
            data.description = "Joes Books charge"
          //  url: 'http://moonstrider.com/api/charge',

          $.ajax({
            type: 'POST',
            url: "/api/charge",         
            data: data,
            dataType: 'json',
            success: function (data) {
                console.log('success');
                console.log(data);
                // now go to last step
              //  thankyouEvent('#demo-modal-3', 3)
            }
            });



//            ajaxJSONPost('http://moonstrider.com/api/charge',data, function(data){
//                console.log("charged: " + JSON.stringify(data,null,4))
//            })
        }

