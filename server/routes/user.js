var express = require('express');
var router = express();
var jwt = require('jsonwebtoken');

var registrationSchema = require('../models/Registration.js');
var sPlatformSchema = require('../models/SelectedPlatforms.js');
var userAnswersSchema = require('../models/UserAnswers.js');

var verFuncs = require('../utils/verificationFunctions.js');
var validFuncs = require('../utils/validationFunctions');

//fetch user's data. the function get's user token, fetching an email and a user permission and searching for the user data in the db.
//input: token
//outpit: object with user's data on success, else false message
router.post('/profile', verFuncs.getTokenFromHeaders, async function (req, res) {
  //verify loged user
  var verifyToken = verFuncs.verifyToken(req.token, jwt);
  if (verifyToken) {
    //check if the token valid and if the user has admin permissions
    //this is a regular user. it will return false
    var check = verFuncs.decodeisAdmin(req.token, jwt);
    if (!check) {
      var userEmail = verFuncs.decodeUserEmail(req.token, jwt);
      var userdata = await registrationSchema.findByEmail(userEmail);
      if (userdata) {
        res.status(200).send({ success: true, message: "success", userdata: userdata });
      }
      else {
        res.status(200).send({ success: false, message: "there is no such user" });
      }
    } else {
      res.status(200).send({ success: false, message: "it is an admin user" });
    }
  } else {
    res.status(200).send({ success: false, message: "session is expired" })
  }
});

//change passwords
//input: email,old password, new password
//output:
router.post('/changePassword', async function (req, res) {
  var changed = await registrationSchema.changePassword(req.body);
  if (true === changed) {
    res.status(200).send({ success: true, message: "password has changed" });
  } else {
    res.status(200).send({ success: false, message: "can't change password" })
  }
})

//save data - userDataChanged
//input: user data to update
//output: respond to the client side. true on success, otherwith false and an array of errors
router.post('/changeUserData', verFuncs.getTokenFromHeaders, async function (req, res) {
  var errors = []; //will contain all the errors
  var verifyToken = verFuncs.verifyToken(req.token, jwt);
  if (verifyToken) {
    var email = verFuncs.decodeUserEmail(req.token, jwt);
    var newData = req.body;
    //to add validation
    await userDataValidation(errors, newData); //data validation
    if (errors.length) {
      res.status(200).send({ success: false, errors: errors })
    }
    else {
      var changed = await registrationSchema.userDataRegistration(newData, email);
      if (true === changed) {
        res.status(200).send({ success: true, message: "data updated" });
      } else {
        res.status(200).send({ success: false, message: "error" })
      }
    }
  } else {
    res.status(200).send({ success: false, message: "session has expired" })
  }
})

//delete acount
//input: email of the user that need to be deleted
//output: true on success, else false
router.post('/remove',verFuncs.getTokenFromHeaders, async function (req, res) {
  var userEmail = await verFuncs.decodeUserEmail(req.token, jwt);
  //find user in the db by it's email and check if the password that has been is correct
  var passGood = await registrationSchema.checkUserWithPassword(userEmail, req.body.password)
  if (passGood) {
    //add password check
    var deleteUser = await registrationSchema.deleteUser(userEmail);
    if (deleteUser) {
      res.status(200).send({ success: true, message: "user removed" });
    }
    else {
      res.status(200).send({ success: false, message: "user wasn't removed" });
    }
  } else {
    res.status(200).send({ success: false, message: "wrong password" });
  }
});

//user data validation
//input: array that will contain validation errors, data to validate
//output: promise 
async function userDataValidation(errors, data) {
  await validFuncs.validateFirstName(errors, data.firstName);
  validFuncs.validateLastName(errors, data.lastName);
  // validFuncs.validatePassword(errors, data.password);
  validFuncs.validateBusinessName(errors, data.business_name);
  //validateString(errors, data.bussiness_type);
  validFuncs.validateMobile(errors, data.mobile);
  validFuncs.validatePhone(errors, data.phone);
  //validateCountry(errors, data.country);
  //validateString(errors, data.city);
  //validateAddress(errors, data.address);
  validFuncs.validateBudget(errors, data.budget)
}

//create user's answers scheme in the db
//input: user_email, questions and answers that were selected by user, relevant platform data for each answer
//output: on success: success message, else false message
router.post('/createUserAnswerDB', async function (req, res) {
  var newDB = new userAnswersSchema(req.body);
  var created = await userAnswersSchema.inputData(newDB)
  if (created) {
    res.status(200).send({ success: true, message: "db was created" })
  } else {
    res.status(200).send({ success: false, message: "can't create selected platforms db" })
  }
})

//create user's answers scheme in the db
//input: user_email, questions and answers that were selected by user, relevant platform data for each answer
//output: on success: success message, else false message
router.post('/addUserAnswer', verFuncs.getTokenFromHeaders, async function (req, res) {
  //verify loged user
  var verifyToken = verFuncs.verifyToken(req.token, jwt);
  if (verifyToken) {
    //check if the token valid and if the user has admin permissions
    //this a regular user. it will return true
    var check = verFuncs.decodeisAdmin(req.token, jwt);
    if (!check) {
      var data = req.body;
      //if the servey is completed
      if (data.survey_completed) {
        res.status(200).send({ success: false, message: "the survey is done" })
      }
      else {
        //find or create new schema for the user if it is new entry. returns the user answers data object
        var user = await userAnswersSchema.findOrCreateUserAnswer(data);
        if (user) {
          var nextQuestion = await userAnswersSchema.insertPlatformsData(data);
          if (nextQuestion) {
            res.status(200).send({ success: true, nextQuestion: nextQuestion })
          } else {
            //if there no more questions to answer on
            res.status(200).send({ success: false, message: "the survey is done" })
          }
        }
        else {
          res.status(200).send({ success: false, message: "error" })
        }
      }
    } else {
      res.status(200).send({ success: false, message: "it is an admin user" });
    }
  } else {
    res.status(200).send({ success: false, message: "session is expired" })
  }
});





//---------------------SelectedPlatform relevant Functions ------------------------//

//create selected platform scheme in the db
//input:  user id and selected platform's data
//output: on success: success message, else false message
router.post('/createSelectedPlatformDB', async function (req, res) {
  var created = await sPlatformSchema.inputData(req.body.user_email)
  if (created) {
    res.status(200).send({ success: true, message: "db was created" })
  } else {
    res.status(200).send({ success: false, message: "can't create selected platforms db" })
  }
})


//fetching the list of the platforms
//input: user_email
//output: on success: success message and platforms, else false message
router.post('/fetchPlatformList', async function (req, res) {
  var result = await sPlatformSchema.fetchSelectedPlatformsData(req.body)
  if (result) {
    res.status(200).send({ success: true, data: result })
  }
  else {
    res.status(200).send({ success: false, message: "Can't fetch data" })
  }
})

//updating user platforms selection
//input: user_email, platforms data
//output: on success: success message ,else false message
router.post('/updatePlatformsSelection', async function (req, res) {
  var result = await sPlatformSchema.updatePlatformSelection(req.body)
  if (result) {
    res.status(200).send({ success: true, message: "Updated" })
  }
  else {
    res.status(200).send({ success: false, message: "Can't fetch data" })
  }
})

module.exports = router;