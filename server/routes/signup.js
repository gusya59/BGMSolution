var express = require('express');
var router = express();
var bodyParser = require('body-parser');
//token generator
var jwt = require('jsonwebtoken');


var registrationSchema = require('../models/Registration.js');
var verFuncs = require('../utils/verificationFunctions.js');
var validFuncs = require('../utils/validationFunctions');

//registration
router.post('/registration', async function (req, res) {
  var user = req.body;
  var errors = []; //will contain all the errors

  await RegistrationValidation(errors, user);
  if (errors.length) {
    res.status(200).send({ success: false, errors: errors }) //the 200 here ia in order to deliever error messages to front
  }
  else {
    //create new user
    var newUser = new registrationSchema(req.body);
    var isCreated = await registrationSchema.inputData(newUser);
    if (isCreated) {
      //create token
      var token = jwt.sign({ userID: isCreated.email, isAdmin: isCreated.isAdmin }, 'todo-app-super-shared-secret', { expiresIn: '4h' });
      res.status(200).send({ success: true, message: "User Created!", token: token })
    }
    else {
      res.status(200).send({ success: false, message: "Password doesn't match!" })
    }
  }
});


//user settings
router.post('/usersettings', verFuncs.getTokenFromHeaders, async function (req, res) {
  // token verification
  var tokenVerification = verFuncs.verifyToken(req.token, jwt);

  if (!tokenVerification) {
    res.status(403).send({ success: false, message: "session is expired" })
  }
  //decode and extract an email
  var userEmail = verFuncs.decodeUserEmail(req.token, jwt);
  var data = req.body;
  var errors = []; //will contain all the errors
  //find specific DB by the email from the token
  var ans = await registrationSchema.isEmailExists(userEmail);
  if (ans) {
    await userDataRegistrationValidation(errors, data); //data validation

    if (errors.length) {
      res.status(200).send({ success: false, errors: errors })
    }
    else {
      var input = await registrationSchema.userDataRegistration(data, userEmail); //insert data into the DB
      if (input) {
        res.status(200).send({ success: true, message: "User Settings data was inserted!" })
      }
    }
  }
  else {
    res.status(200).send({ success: true, message: "There is no such user" })
  }

});

//log in function
router.post('/login', async function (req, res) {
  var body = req.body;
  var errors = [];
  // check the validation of email and password input
  if (validFuncs.validateEmail(errors, body.email) && (validFuncs.validatePassword(errors, body.password))) {
    if (!errors.length) { //validate email and password input
      //if email and password are valid
      var emailFound = await registrationSchema.findByEmail(body.email); //returns user object with all the data
      if (emailFound) {
        var passGood = await registrationSchema.verifyPassword(body.password, emailFound.password)
        //check if there is no such user and if the password is matching
        if (!passGood) {
          res.status(200).send({ success: false, message: "email or password doesn't match" });
        }
        else {
          //create token
          var token = jwt.sign({ userID: emailFound.email, isAdmin: emailFound.isAdmin }, 'todo-app-super-shared-secret', { expiresIn: '4h' });
          //console.log("the token is "+ token);
          res.status(200).send({ success: true, token: token });
        }
      }
      res.status(200).send({ success: false, message: "email wasn't found" });
    }
  }
  else {
    res.status(200).send({ success: false, errors: errors });
  }
})

//functions
//registaration validation
async function RegistrationValidation(errors, user) {
  await validFuncs.validateFirstName(errors, user.firstName);
  validFuncs.validateLastName(errors, user.lastName);
  validFuncs.validateEmail(errors, user.email);
  validFuncs.validatePassword(errors, user.password);
}

//unput user data validation
async function userDataRegistrationValidation(errors, data) {
  await validFuncs.validateBusinessName(errors, data.business_name);
  //validateString(errors, data.bussiness_type);
  validFuncs.validateMobile(errors, data.mobile);
  validFuncs.validatePhone(errors, data.phone);
  //validateCountry(errors, data.country);
  //validateString(errors, data.city);
  //validateAddress(errors, data.address);
  validFuncs.validateBudget(errors, data.budget)
}





module.exports = router;
