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



module.exports = router;


