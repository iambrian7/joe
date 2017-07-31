$(function() {

    $("#contactForm input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            // new post for comments  ******************
    //    var msg = $("textarea#message").val();//sentMessage;
        var data = {};
        data.name = $("input#name").val();//msg.name.value;
        data.email = $("input#email").val();//msg.email.value;
       // data.phone = msg.phone.value;
        data.comment =  $("textarea#message").val();//msg.comment.value;
       // console.log('send contact form: ' + JSON.stringify(data,null,2))
        ajaxJSONPost('/comments',data, function(data){
            //console.log("comments sent: " + JSON.stringify(data,null,4))
            $(".alert").addClass("in")
            setTimeout(function(){
                $(".alert").removeClass("in")
            },2000)
            
            // reset form
            $form[0].reset();
        });

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

        //event.preventDefault();

          // new post for comments  ******************


            // old post for comments  ***********************
            // $.ajax({
            //    // url: "././mail/contact_me.php",
            //     url: "http://briancarlson.co/email/contact_me.php",
            //     type: "POST",
            //     data: {
            //         name: name,
            //         email: email,
            //         message: message
            //     },
            //     cache: false,
            //     success: function() {
            //         // Success message
            //         $('#success').html("<div class='alert alert-success'>");
            //         $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            //             .append("</button>");
            //         $('#success > .alert-success')
            //             .append("<strong>Your message has been sent. </strong>");
            //         $('#success > .alert-success')
            //             .append('</div>');

            //         //clear all fields
            //         $('#contactForm').trigger("reset");
            //     },
            //     error: function() {
            //         // Fail message
            //         $('#success').html("<div class='alert alert-danger'>");
            //         $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            //             .append("</button>");
            //         $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
            //         $('#success > .alert-danger').append('</div>');
            //         //clear all fields
            //         $('#contactForm').trigger("reset");
            //     },
            // })
             // old post for comments  ***********************
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});
