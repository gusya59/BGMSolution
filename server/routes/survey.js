var express = require('express');
var router = express();
var jwt = require('jsonwebtoken');

var SurveySchema = require('../models/Survey')
var verFuncs = require('../utils/verificationFunctions.js')

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
            console.log("errorr");
            res.status(200).send({ success: false, message: "can't create survey" })
        } else {
            res.status(200).send({ success: true, message: "survey was created" })
        }
    }))
})


//fetching all the data from the Survey Collection
//input: none
//output: on success: success message and survey db data, else false message
router.post('/fetchSurveyData', async function (res) {
    await SurveySchema.find(function (err, SurveySchemas) {
        if (err) {
            res.status(200).send({ success: fail, message: "can't fetch survey db data" });
        }
        else {
            res.status(200).send({ success: true, surveyData: SurveySchemas });
        }
    })
})
//create new question
//input: data:question and answers data
//output: on success: success message , else false message
router.post('/addNewQuestion', async function (req, res) {

    var newQuestion = new SurveySchema(req.body);
    var isCreated = await SurveySchema.insertDataIntoDB(newQuestion);
    if (isCreated) {
        res.status(200).send({ success: true, message: "New question has been saved" })
    }
    else {
        res.status(200).send({ success: false, message: "Can't save the new question" })
    }
})

//delete question and all the relevant data including the relevant answers and platforms data
//input: question id
//output: on success: success message , else false message
router.post('/removeQuestion', async function (req, res) {
    var isDeleted = await SurveySchema.deleteQuestion(req.body);
    if (isDeleted) {
        res.status(200).send({ success: true, message: "Question was deleted" })
    }
    else {
        res.status(200).send({ success: false, message: "Cant delete the question" })
    }
})

//fetch specific answer data from the db (including the relevant platforms)
//input: answer's id
//output: answer's data on success, else false
router.post('/fetchPlatform', async function (req, res) {
    var result = await SurveySchema.fetchPlatformData(req.body);
    if (result) {
        res.status(200).send({ success: true, data: result })
    }
    else {
        res.status(200).send({ success: false, message: "Can't fetch data" })
    }
})

//fetch specific question data from the db (including the relevant answers)
//input: question's id
//output: question's data on success, else false
router.post('/fetchQuestion', async function (req, res) {
    var result = await SurveySchema.fetchQuestionData(req.body);
    if (result) {
        res.status(200).send({ success: true, data: result })
    }
    else {
        res.status(200).send({ success: false, message: "Can't fetch data" })
    }
})

//*****************************************Update Survey's Data Functions*****************************/
//edit question data
//input: data: the id and the text of specific question
//output: on success: success message , else false message
router.post('/saveQuestion', async function (req, res) {
    var isCreated = await SurveySchema.updateQuestion(req.body);
    if (isCreated) {
        res.status(200).send({ success: true, message: "Question's data has been updated" })
    }
    else {
        res.status(200).send({ success: false, message: "Can't save the new question" })
    }
})


//edit answer
//input: data: question id, answer id and answer's text
//output: on success: success message , else false message
router.post('/saveAnswer', async function (req, res) {
    var isCreated = await SurveySchema.updateAnswer(req.body);
    if (isCreated) {
        res.status(200).send({ success: true, message: "Answer's data has been updated" })
    }
    else {
        res.status(200).send({ success: false, message: "Can't save the new question" })
    }
})



//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ ask david about this. one or two separate functions?
//edit platforms data
//input: data
//output: on success: success message , else false message
router.post('/savePlatform', async function (req, res) {
    var isCreated = await SurveySchema.updatePlatform(req.body);
    if (isCreated) {
        res.status(200).send({ success: true, message: "Answer's data has been updated" })
    }
    else {
        res.status(200).send({ success: false, message: "Can't save the new question" })
    }
})



module.exports = router;