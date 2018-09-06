var express = require('express');
var router = express();
var jwt = require('jsonwebtoken');

var sPlatformSchema = require('../models/SelectedPlatforms.js');
var userAnswersSchema = require('../models/UserAnswers.js');
var BudgetSchema = require('../models/Budget');
var registrationSchema = require('../models/Registration.js');
var PlatformsSchema = require('../models/Platforms');
var SurveySchema = require('../models/Survey')

//utils
var verFuncs = require('../utils/verificationFunctions.js')


router.post('/test', async function (req, res) {
    var input = req.body;
    //find the newest survey
    var found = await SurveySchema.findOne().sort({ created: -1 });
   // console.log(found);
   // var result = await SurveySchema.questionIdGenerator(found.question_id)

//   for(var i=0; i<4;i++){
//       found.answers[i].answer_id =await SurveySchema.answerIdGenerator(i)
//   }
  // var result = await SurveySchema.answerIdGenerator(3)
    console.log("the result" +found);

})












//--------------------------create DB in insert full data -------------------//
//--------------------------Survey---Budget---Platforms---UserAnswers---SelectedPlatforms----------------//


//creating survey scheme in the db
//input: survey data
//output: on success: success message, else false message
router.post('/createAlgoData', async function (req, res) {
    var input = req.body;
    var newAlgoData = new SurveySchema({
        question_id: input.question_id,
        question_text: input.question_text,
        next_question: input.next_question,
        answers: input.answers
    });
    newAlgoData.save((function (err) {
        if (err) {
            res.status(200).send({ success: false, message: "can't create survey" })
        } else {
            res.status(200).send({ success: true, message: "survey was created" })
        }
    }))
})
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

//creating budget scheme in the db
//input: budget data
//output: on success: success message, else false message
router.post('/createPlatforms', async function (req, res) {
    var input = req.body;
    var newPlatformsData = new PlatformsSchema({
        platforms: input.platforms
    });
    var created = await PlatformsSchema.inputData(newPlatformsData)
    console.log(created);
    if (!created) {
        res.status(200).send({ success: false, message: "can't create schema" })
    } else {
        res.status(200).send({ success: true, message: "schema was created" })
    }
})

//creating budget scheme in the db
//input: budget data
//output: on success: success message, else false message
router.post('/createBudgetSchemaData', async function (req, res) {
    var result = await BudgetSchema.inputData(req.body.user_email, req.body.user_budget)
    if (!result) {
        res.status(200).send({ success: false, message: "can't create schema" })
    } else {
        res.status(200).send({ success: true, message: "schema was created" })
    }
})

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



module.exports = router;


