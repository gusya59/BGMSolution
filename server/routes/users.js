var express = require('express');
var router = express();
var expressJwt = require('express-jwt');



//registration
router.post('/admin', async function (req, res) {
    console.log("the input is: " + req.body);

    //sending the amount of regular users
    //sending the amount of admin users

    
    console.log(req.body.firstName ,req.body.email ,req.body.password ,req.body.passwordConfirmation, req.body.termsConfirmCheck)
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
  



module.exports = router;