var express = require('express');
var router = express();
var jwt = require('jsonwebtoken');

var SurveySchema = require('../models/Survey')
var verFuncs = require('../utils/verificationFunctions.js')


//fetching all the data from the Survey Collection
//input: user's token
//output: on success: success message and survey db data, else false message
router.post('/fetchSurveyData', verFuncs.getTokenFromHeaders, async function (req, res) {
    //verify loged user
    var verifyToken = await verFuncs.verifyToken(req.token, jwt);
    if (verifyToken) {
        //check if the token valid and if the user has admin permissions
        //this is an admin. it will return false
        var check = await verFuncs.decodeisAdmin(req.token, jwt);
        if (check) {
            await SurveySchema.find(function (err, SurveySchemas) {
                if (err) {
                    res.status(200).send({ success: fail, message: "can't fetch survey db data" });
                }
                else {
                    res.status(200).send({ success: true, surveyData: SurveySchemas });
                }
            })
        } else {
            res.status(200).send({ success: false, message: "it is a regular user" });
        }
    } else {
        res.status(200).send({ success: false, message: "session is expired" })
    }
});



//create new question
//input: data:question and answers data
//output: on success: success message , else false message
router.post('/addNewQuestion', async function (req, res) {
    //create new schema
    var isCreated = await SurveySchema.insertDataIntoDB(req.body);
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
//input: user's token and question's id
//output: question's data on success, else false
router.post('/fetchQuestion', verFuncs.getTokenFromHeaders, async function (req, res) {
    //verify loged user
    var verifyToken = verFuncs.verifyToken(req.token, jwt);
    if (verifyToken) {
        //if this the first user's question
        if (0 == req.body.question_id) {
            var result = await SurveySchema.findOne().sort({ created: -1 });
        } else {
            var result = await SurveySchema.fetchQuestionData(req.body);
        }
        if (result) {
            res.status(200).send({ success: true, data: result })
        }
        else {
            res.status(200).send({ success: false, message: "Can't fetch data" })
        }
    } else {
        res.status(200).send({ success: false, message: "session is expired" })
    }
});



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



//edit platforms data
//input: answer_id, platform object with platform name ans platform weight
//output: on success: success message , else false message
router.post('/savePlatform', async function (req, res) {
    var platform_weight = req.body.platforms.platform_weight;
    //check if the platfrom weight is correct. need to be 0<=platform weight<=1
    if (0 <= platform_weight && platform_weight <= 1) {
        var isCreated = await SurveySchema.updatePlatform(req.body);
        if (isCreated) {
            res.status(200).send({ success: true, message: "Answer's data has been updated" })
        }
        else {
            res.status(200).send({ success: false, message: "Can't save the new question" })
        }
    } else {
        res.status(200).send({ success: false, message: "Wrong weight parametr" })
    }

})

//edit platforms data
//input: answer_id, next question
//output: on success: success message , else false message
router.post('/saveNextQuestion', async function (req, res) {
    var input = req.body;
    //check if there is such question in the db
    var check = await SurveySchema.checkIfThereQuestion(input.next_question)
    //if the question has been found or if the question_id==1 (end of survey)
    if (check || (1 == input.next_question)) {
        //update question
        var isCreated = await SurveySchema.updateNextQuestion(input);
        if (isCreated) {
            res.status(200).send({ success: true, message: "Answer's data has been updated" })
        }
        else {
            res.status(200).send({ success: false, message: "Can't save the new question" })
        }
    } else {
        res.status(200).send({ success: false, message: "There is no such question" })
    }
})


module.exports = router;