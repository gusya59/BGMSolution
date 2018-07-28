var express = require('express');
var router = express();
var bodyParser = require('body-parser');
//token generator
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

var registrationSchema = require('../models/Registration.js');


//registration
router.post('/registration', async function (req, res) {
console.log("the input is: "+req.body);
  var user = req.body;
  var errors = []; //will contain all the errors
  await RegistrationValidation(errors, user);
  if (errors.length) {
    res.status(200).send({ success: false, errors: errors }) //the 200 here ia in order to deliever error messages to front
  }
  else {
    //create new user
    var newUser = new registrationSchema(req.body);
    var isCreated = await registrationSchema.inputData(newUser)
    //console.log("is created? "+isCreated);
    if (isCreated) {
      res.status(200).send({ success: true, message: "User Created!" })
    }
    else {
      res.status(200).send({ success: false, message: "Password doesn't match!" })
    }
  }
});


//user settings
router.post('/usersettings', async function (req, res) {
  var data = req.body;
  var errors = []; //will contain all the errors
  //find specific DB
  await userDataRegistrationValidation(errors, data); //data validation
  if (errors.length) {
    res.status(200).send({ success: false, errors: errors })
  }
  else {
    var input = await registrationSchema.userDataRegistration(data); //insert data into the DB
    if (input) {
      res.status(200).send({ success: true, message: "User Settings data was inserted!" })
    }
  }
});

//log in function
router.post('/login', async function(req, res){
  //console.log("the login input is: "+req.body);
  var body = req.body;
  var errors = [];
  // check the validation of email and password input
  await validateEmail(errors, body.email).then(validatePassword(errors,body.password));
  if(!errors.length){ //validate email and password input
     //if email and password are valid
    var emailFound = await registrationSchema.findByEmail(body.email); //returns user object with all the data
    var passGood = await registrationSchema.verifyPassword(body.password, emailFound.password)
    //check if there is such user and if the password is matching
    if (!emailFound || !passGood){
      res.status(200).send({success:false,message: "email or password doesn't match"});
    }
    else{ 
    //create token
    var token = jwt.sign({userID: body.email}, 'todo-app-super-shared-secret', {expiresIn: '4h'});
    //console.log("the token is "+ token);
    res.status(200).send({success:true, token:token});
    }
  }
  else{
    res.status(200).send({success:false,errors: errors});
  } 
})

//functions
//registaration validation
async function RegistrationValidation(errors, user) {
  await validateFirstName(errors, user.firstName);
  validateLastName(errors, user.lastName);
  validateEmail(errors, user.email);
  validatePassword(errors, user.password);
}

//unput user data validation
async function userDataRegistrationValidation(errors, data) {
  await validateBusinessName(errors, data.business_name);
  //validateString(errors, data.bussiness_type);
  validateMobile(errors, data.mobile);
  validatePhone(errors, data.phone);
  //validateCountry(errors, data.country);
  //validateString(errors, data.city);
  //validateAddress(errors, data.address);
}

//first name validation -> checks if there any numbers or characters in the name
async function validateFirstName(errors, data) {
  if (!isEmptyOrInvalid(data)) {
    errors.push("first name is empty");
  }
  else {
    var reg = RegExp('^[A-Za-z]+$')  //only alphabet  to do something with length?
    if (!reg.test(data)) {
      errors.push("the first name is not right")
    }
  }
}
//last name validation -> checks if there any numbers or characters in the name
//שכפול קוד. לאחד לפונקציה אחת?
async function validateLastName(errors, data) {
  if (!isEmptyOrInvalid(data)) {
    errors.push("last name is empty");
  }
  else {
    var reg = RegExp('^[A-Za-z]+$')  //only alphabet   to do something with length?
    if (!reg.test(data)) {
      errors.push("the last name is not right")
    }
  }
}
//first name validation -> checks if there any numbers or characters in the name
async function validateEmail(errors, data) {
  if (!isEmptyOrInvalid(data)) {
    errors.push("email is empty");
  }
  else {
    //numbers, letters, @, characters
    var reg = RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$')
    if (!reg.test(data)) {
      errors.push("the email is not right")
    }
  }
}
//validate password
async function validatePassword(errors, data) {
  if (!isEmptyOrInvalid(data)) {
    errors.push("last password is empty");
  }
  else {
    var reg = RegExp('^(?=.*?[A-Z])(?=.*?[a-z]).{7,}([0-9])$')  //at least 8 characters, one upper and one lower case, numbers - ,{7,}->more than 8. it's counting from 0
    if (!reg.test(data)) {
      errors.push("the password is not right")
    }
  }
}
//check if the data input is empty
async function isEmptyOrInvalid(str) {
  if (typeof str != "undefined" && str != null && str.length != null && str.length > 0) {
    return false;
  }
  return true;
}
//check if this a string - good for different functions
async function validateString(errors, data) {
  if (!isEmptyOrInvalid(data)) {
    errors.push("string is empty");
  }
  else {
    var reg = RegExp('^([A-Za-z])(//s)+$')  //only alphabet   to do something with length?
    if (!reg.test(data)) {
      errors.push(reg + "the string is not right")
    }
  }
}
async function validateBusinessName(errors, data) {
  if (!isEmptyOrInvalid(data)) {
    errors.push("string is empty");
  }
  else {
    var reg = RegExp('^(.)+$')  //any caharacter except new line
    if (!reg.test(data)) {
      errors.push("the business is not right")
    }
  }
}
//mobile number validation
async function validateMobile(errors, data) {
  if (!isEmptyOrInvalid(data)) {
    errors.push("mobile is empty");
  }
  else {
    var reg = RegExp('^([0-9]*)$')  //numbers
    if (!reg.test(data)) {
      errors.push("the mobile is not right")
    }
  }
}
//phone number validation
async function validatePhone(errors, data) {
  if (!isEmptyOrInvalid(data)) {
    errors.push("phone is empty");
  }
  else {
    var reg = RegExp('^([0-9]*)$')  //numbers, '-',
    if (!reg.test(data)) {
      errors.push("the phone is not right")
    }
  }
}
//address validation
async function validateAddress(errors, data) {
  if (!isEmptyOrInvalid(data)) {
    errors.push("address is empty");
  }
  else {
    var reg = RegExp('^([A-Z]*)(/.*)(/,*)(/s*)$')  //alphabet, '.', ',' ,whitespaces
    if (!reg.test(data)) {
      errors.push("the address is not right")
    }
  }
}




module.exports = router;
