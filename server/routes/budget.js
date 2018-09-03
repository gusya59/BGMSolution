var express = require('express');
var router = express();
var jwt = require('jsonwebtoken');

var registrationSchema = require('../models/Registration.js');
var sPlatformSchema = require('../models/SelectedPlatforms.js');
var userAnswersSchema = require('../models/UserAnswers.js');
var BudgetSchema = require('../models/Budget');

//---------------------------Budget calaculations----------------------------//

//creating budget scheme in the db
//input: budget data
//output: on success: success message, else false message
router.post('/createBudgetSchemaData', async function (req, res) {
    var input = req.body;
    console.log(input);
    var newBudgetData = new BudgetSchema({
        user_email: input.user_email,
        user_budget: input.user_budget,
        platforms_budget: input.platforms_budget

    });
    var created = await BudgetSchema.inputData(newBudgetData)
    if (!created) {
        res.status(200).send({ success: false, message: "can't create schema" })
    } else {
        res.status(200).send({ success: true, message: "schema was created" })
    }

})

router.post('/temp', async function (req, res) {

    var arraySize = await BudgetSchema.fetchBudgetData(req.body.user_email)
    // result.find(count)
    console.log(arraySize);
    res.status(200).send({ success: true, message: arraySize })
})

router.post('/calculateBudget', async function (req, res) {
 try{
     var userAnswersData = await userAnswersSchema.findNewestUserAnswers(req.body.user_email);
    if (userAnswersData) {
        var questionsArraySize = await userAnswersSchema.calculateLength(userAnswersData.user_email);
        var platformsArraySize = await BudgetSchema.calculateLength(req.body.user_email);
        if (questionsArraySize && platformsArraySize) {
            //run on the platforms and calculate the weights
            for (var j = 0; j < platformsArraySize; j++) {
                var p_budget_percent = 1;
                for (var i = 0; i < questionsArraySize; i++) {
                    p_budget_percent = p_budget_percent * userAnswersData.questions[i].platforms[j].platform_weight;
                }
                var platform_name =userAnswersData.questions[0].platforms[j].platform_name;
                //update the budget calculations in the the budget schema
                //update the budget persentage for a specific platform
                var pbpResult = await BudgetSchema.updateBudgetPercent(userAnswersData.user_email, platform_name, p_budget_percent);
                //calculate budget to ivest for the specific platform
                var p_budget = p_budget_percent * await BudgetSchema.findNewestUserBudget(userAnswersData.user_email);
                //update the budget for a specific platform
                var pbResult = await BudgetSchema.updateBudget(userAnswersData.user_email, platform_name, p_budget);
                if (pbpResult && p_budget && pbResult) {
                    var updatedBudget = await BudgetSchema.fetchBudgetData(userAnswersData.user_email);
                    if (updatedBudget) {
                        res.status(200).send({ success: true, budgetData: updatedBudget });
                    }
                    //  else {
                    //     res.status(200).send({ success: false, message: "can't fetch budget's data" })
                    // }

                 }
                // else {
                //     res.status(200).send({ success: false, message: "can't update budget" })
                // }
            }
        }
        //  else {
        //     res.status(200).send({ success: false, message: "array is empty" })
        // }
    }
    //  else {
    //     res.status(200).send({ success: false, message: "can't find user's answers in the db" })
    // }
 }catch(err){
    res.status(200).send({ success: false, message: "can't find user's answers in the db" })
 }
    
 
    
})



module.exports = router;