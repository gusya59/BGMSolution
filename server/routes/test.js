var express = require('express');
var router = express();
var jwt = require('jsonwebtoken');

var sPlatformSchema = require('../models/SelectedPlatforms.js');
var userAnswersSchema = require('../models/UserAnswers.js');
var BudgetSchema = require('../models/Budget');
var registrationSchema = require('../models/Registration.js');
var PlatformsSchema = require('../models/Platforms')

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
    var result = await PlatformsSchema.calculateLength()
    console.log(result);

})



module.exports = router;


