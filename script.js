$(document).ready(function(){



    // Variables for checking if any input is invalid when form is submitted.
    var uCheck = false;
    var eCheck = false;
    var pCheck = false;
    var cpCheck = false; 
    var phoneCheck = false;

    var eyeIcon = $('.eye');

    // Function for showing password and confirm pasword field on clicking the eye icon
    $(eyeIcon).on('click', function(){

        var password = document.getElementById('pwd');
        var confirmPassword = document.getElementById('confirm-pwd');

        if( (password.type == "password") )
            {
            password.type = "text";
            confirmPassword.type = "text";
            eyeIcon.removeClass('fa-eye');
            eyeIcon.addClass('fa-eye-slash')
        }
        else
        {
            password.type = "password";
            confirmPassword.type = "password";
            eyeIcon.removeClass('fa-eye-slash');
            eyeIcon.addClass('fa-eye')
        }
    });

    // Variables for accessing input fields.
    var username = $('#name');
    var email = $('#email');
    var password = $('#pwd');
    var confirmPassword = $('#confirm-pwd');
    var phone = $('#phone');
    var submit = $('#submit');


    //	Function to show error message if input is wrong
    function showError(string, messageClass, field, icon)
    {
        $(messageClass).html(string);

        $(field).addClass('error');
        $(icon).addClass('fa-exclamation-circle');

        $(messageClass).addClass('error-msg');    

    }

    //	Function to show message if input is correct
    function successMessage(string, messageClass, field, icon)
    {
        $(messageClass).html(string);

        $(messageClass).removeClass('error-msg');
        $(messageClass).addClass('success-msg');
        
        $(field).removeClass('error');
        $(field).addClass('success');

        $(icon).removeClass('fa-exclamation-circle');
        $(icon).addClass('fa-check-circle');

    }

     // Validation of username input
     $(username).on('keyup', function(){

        var uPattern = /^[a-zA-Z0-9-.]+$/;

        // Calling ShowError and successMessage functions with parameters having the message string, span class, field and icon class 

            if(username.val().length <= 0)
            {
                showError("Username can't be empty.", '.name', username, '.n-icon');
                uCheck = false;
            }

            else if( !isNaN( username.val() ) )
            {
                showError("Invalid Username. You can use a combination of alphabets and numbers.", '.name', username, '.n-icon');
                uCheck = false;
            }

            else if((username.val().length <= 4) || (username.val().length > 12))
            {
                showError("Username must contain 5-12 characters.", '.name', username, '.n-icon');
                uCheck = false;
            }

            else if( !( username.val().match(uPattern) ) )
            {
                showError("Username should not contain any special characters except dot (.) and hyphen (-).", '.name', username, '.n-icon');
                uCheck = false;
            }

            else
            {
                successMessage("This Username is available.", '.name', username, '.n-icon');
                uCheck = true;
            }
        
    });

    $(username).on('blur', function(){
        // $('.n-icon').removeClass('fa-check-circle');
        // $(username).removeClass('success');
        $('.name').removeClass('success-msg');
    });

    // Validation of email input
    $(email).on('keyup', function(){

        var emailId = $(email).val();

        // firstName is a substring of the string value of email address. It contains the part before @
        var firstName = emailId.substring(0, emailId.indexOf('@'));

        // middletName is a substring of the string value of email address. It contains the part between @ and '.'
        var middleName = emailId.substring(emailId.indexOf('@')+1, emailId.indexOf('.'));

        var domainName = emailId.substring(emailId.indexOf('.')+1);

        var ePattern = /^[a-zA-Z0-9@.]+$/;

        function checkDomain(){
            if(domainName == "com")
                return true;

            else if(domainName == "in")
                return true;

            else if(domainName  == "gov")
                return true;

            else if(domainName  == "edu")
                return true;

            else if(domainName  == "org")
                return true;

            else
                return false;

        }


        if(email.val().length <= 0)
        {
            showError("Email can't be empty.", '.email', email, '.e-icon');
            eCheck = false;
        }

        else if(emailId.indexOf('@') ==-1)
        {
            showError("'@' symbol is missing.", '.email', email, '.e-icon');
            eCheck = false;
        }

        else if( (firstName.length < 3) || (firstName.length > 12) )
        {
            showError("The Username part before '@' should have 3-12 characters.", '.email', email, '.e-icon');
            eCheck = false;
        }

        else if( !isNaN( firstName ) )
        {
            showError("Invalid Email Address. You can use a combination of alphabets and numbers.", '.email', email, '.e-icon');
            eCheck = false;
        }

        else if( !( emailId.match(ePattern) ) )
        {
            showError("Email Address should not contain any special characters (except dot (.) and @). All the alphabets and numbers are allowed.", '.email', email, '.e-icon');
            eCheck = false;
        }

        else if(emailId.indexOf('.') ==-1)
        {
            showError("dot symbol is missing.", '.email', email, '.e-icon');
            eCheck = false;
        }

        else if( emailId.indexOf('.') < emailId.indexOf('@') )
        {
            showError("You are using dot symbol at wrong place.", '.email', email, '.e-icon');
            eCheck = false;
        }

        else if(middleName.length ==0)
        {
            showError("Please enter the domain name of email service provider.", '.email', email, '.e-icon');
            eCheck = false;
        }

        else if(middleName.length < 3)
        {
            showError("Invalid Email Address. The Domain name is too short. Try Something else.", '.email', email, '.e-icon');
            eCheck = false;
        }

        else if(domainName.length <=0)
        {
            showError("A Top level domain name is required. For example:- '.com'", '.email', email, '.e-icon');
            eCheck = false;
        }

        else if(checkDomain()==false)
        {
            showError("Invalid Email Address. Choose a different top level domain. For example:- '.com', '.in', '.org', '.edu' or '.gov'.", '.email', email, '.e-icon');
            eCheck = false;
        }

        else if(middleName.length > 10)
        {
            showError("Invalid Email Address. The Domain name is too long. Try Something else.", '.email', email, '.e-icon');
            eCheck = false;
        }

        else
        {
            successMessage(" This Email Address is available.", '.email', email, '.e-icon');
            eCheck = true;
        }
            
    });

    $(email).on('blur', function(){
        // $('.n-icon').removeClass('fa-check-circle');
        // $(username).removeClass('success');
        $('.email').removeClass('success-msg');
    });

     // Validation of Password field.
     $(password).on('keyup', function(){

        var passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~`!@#$%^&*-_=+?])[a-zA-Z0-9~`!@#$%^&*()-_=+?]{8,16}$/;

        if(password.val().length == 0)
        {
            showError("Password can't be empty.", '.pwd', password, '.p-icon');
            pCheck = false;
        }

        else if(password.val().length < 8)
        {
            showError("Password is too short.", '.pwd', password, '.p-icon');
            pCheck = false;
        }

        else if(password.val().length > 16)
        {
            showError("Password is too long.", '.pwd', password, '.p-icon');
            pCheck = false;
        }

        else if( !isNaN( password.val() ) )
        {
            showError("Your Password is too weak. You can use a combination of alphabets, numbers and special characters.", '.pwd', password, '.p-icon');
            pCheck = false;
        }

        else if( !( password.val().match(passwordPattern) ) )
        {
            showError("Password should contain atleast one lowercase character, one uppercase character, a digit and one special character (such as ~`!@#$%^&*).", '.pwd', password, '.p-icon');
            pCheck = false;
        }

        else
        {
            successMessage("This password can be used.", '.pwd', password, '.p-icon');
            pCheck = true;
        }

        $(password).on('keyup', function(){

            $('.cp-icon').removeClass('fa-check-circle');
            $(confirmPassword).removeClass('success');

            if(confirmPassword.val().length == 0)
            {
                showError("This field can't be empty.", '.confirm-pwd', confirmPassword, '.cp-icon');
                cpCheck = false;
            }

            else if(password.val() != confirmPassword.val())
            {
                showError("Password doesn't matched. Type again carefully.", '.confirm-pwd', confirmPassword, '.cp-icon');
                cpCheck = false;
            }

            else
            {
                successMessage("Password matched successfully.", '.confirm-pwd', confirmPassword, '.cp-icon');
                cpCheck = true;
            }

        });

    });

    $(password).on('blur', function(){
        // $('.n-icon').removeClass('fa-check-circle');
        // $(username).removeClass('success');
        $('.pwd').removeClass('success-msg');
    });

    // Validation of Confirm Password field.
    $(confirmPassword).on('keyup', function(){

        if(confirmPassword.val().length == 0)
        {
            showError("This field can't be empty.", '.confirm-pwd', confirmPassword, '.cp-icon');
            cpCheck = false;
        }

        else if(password.val() != confirmPassword.val())
        {
            showError("Password doesn't matched. Type again carefully.", '.confirm-pwd', confirmPassword, '.cp-icon');
            cpCheck = false;
        }

        else
        {
            successMessage("Password matched successfully.", '.confirm-pwd', confirmPassword, '.cp-icon');
            cpCheck = true;
        }

    });

    $(confirmPassword).on('blur', function(){
        // $('.n-icon').removeClass('fa-check-circle');
        // $(username).removeClass('success');
        $('.confirm-pwd').removeClass('success-msg');
    });

    // Validation of Mobile no. field.
    $(phone).on('keyup', function(){

        if(phone.val().length == 0)
        {
            showError("Phone number can't be empty.", '.phone', phone, '.phone-icon');
            phoneCheck = false;
        }

        else if( isNaN(phone.val()) )
        {
            showError("Invalid Phone number. Please enter numbers only.", '.phone', phone, '.phone-icon');
            phoneCheck = false;
        }

        else if( ( phone.val().length != 10 ) || ( phone.val() <= 0 ) )
        {
            showError("Invalid Phone number. Please enter a valid 10-digit Phone number.", '.phone', phone, '.phone-icon');
            phoneCheck = false;
        }

        else
        {
            successMessage("Phone number can be used.", '.phone', phone, '.phone-icon');
            phoneCheck = true;
        }

    });

    $(phone).on('blur', function(){
        // $('.n-icon').removeClass('fa-check-circle');
        // $(username).removeClass('success');
        $('.phone').removeClass('success-msg');
    });



    $(submit).on('click', function(e){

        if( (uCheck==true) && (eCheck==true) && (pCheck==true) && (cpCheck==true) && (phoneCheck==true) )
        {
            alert("Form was submitted successfully.");
            return true;
            
        }

        else if( (username.val()=="") && (email.val()=="") && (password.val()=="") && (confirmPassword.val()=="") && (phone.val()=="") )
        {
            alert("You are trying to submit an empty form. Please fill the details first.");
            e.preventDefault();
            return false;
        }

        else{
            alert("Form submition failed. Please check the details submitted and try again.");
            e.preventDefault();
            return false;
        }

    });

});
