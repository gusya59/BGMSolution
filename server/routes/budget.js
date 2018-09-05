var express = require('express');
var router = express();
var jwt = require('jsonwebtoken');

var sPlatformSchema = require('../models/SelectedPlatforms.js');
var userAnswersSchema = require('../models/UserAnswers.js');
var BudgetSchema = require('../models/Budget');
var PlatformsSchema = require('../models/Platforms')

//---------------------------Budget calaculations----------------------------//

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

router.post('/temp', async function (req, res) {
    var email = "yyy@hhh.com";
    var name = "Facebook";
    var result = await isPlatformSelected(email, name)
})

//calculate and update user's budget distribution for the platforms that user selected.
//this function operate the calculation and update
//input: user's email
//output: on success: success message and users budget db data, else false message
router.post('/calculateBudget', async function (req, res) {
    var errors = []; //will contain all the errors
    try {
        //find the relevant schema in the user answers db. will contain all the questions and answers that user answered on and a relevant platform data
        var userAnswersData = await userAnswersSchema.findNewestUserAnswers(req.body.user_email);
        if (userAnswersData) {
            //budget distribution calculations and updates
            var result = await budgetCalculations(userAnswersData, errors);
            if (!errors.length) { //if everuthing was fine and there were no errors
                res.status(200).send({ success: true, message: result })
            }
        } else {
            res.status(200).send({ success: false, errors: errors });
        }
    } catch (err) {
        res.status(200).send({ success: false, message: errors })
    }

})

//--------------------------------------------Calculation and update of the budget distribution functions----------------------------------//

//calculate and update user's budget distribution for the platforms that user selected.
//input: user's email
//output: on success: success message and users budget db data, else false message
async function budgetCalculations(userAnswersData, errors) {
    //calculate the size of arrays 
    //amount of question that were answered by user
    var questionsArraySize = await userAnswersSchema.calculateLength(userAnswersData.user_email);
    //amount of platforms
    var platformsArraySize = await BudgetSchema.calculateLength(userAnswersData.user_email);
    if (questionsArraySize && platformsArraySize) {
        //calculate the total weigth of the platform per each platform and update the parametr in the budget db
        var perUpdated = await calculateAndUpdatePercentage(userAnswersData, questionsArraySize, platformsArraySize, errors);
        if (perUpdated) {
            //calculate the relative percentage of the total weigth of the platform per each platform and update the parametr in the budget db
            var relPerUpdated = await calculateRelativePercentage(userAnswersData.user_email, platformsArraySize, errors);
            if (relPerUpdated) {
                //calculate the relative percentage of the total weigth of the platform per each platform and update the parametr in the budget db
                var budgetUpdated = await calculatePlatformBudget(userAnswersData.user_email, platformsArraySize, errors);
                if (budgetUpdated) {
                    return budgetUpdated
                } else {
                    errors.push("calculatePlatformBudget error")
                }
            } else {
                errors.push("calculateRelativePercentage error")
            }
        } else {
            errors.push("calculateAndUpdatePercentage error")
        }

    } else {
        errors.push("array is empty")
        return false;
    }
}

//calculate the total weigth of the platform per each platform and update the parametr in the budget db
//input: user's email, amount of questions-answers to scan, amount of platforms
//output: true
async function calculateAndUpdatePercentage(userAnswersData, questionsArraySize, platformsArraySize) {
    var pbpResult = 1; //platform budget percentage
    //scan all the platforms for each question, check if the platform was selected for calculations and later check if the data was updated in the db (on first run it always ok)
    for (var j = 0; j < platformsArraySize && pbpResult && await isPlatformSelected(userAnswersData.user_email, userAnswersData.questions[0].platforms[j].platform_name); j++) {
        var p_budget_percent = 1;
        //scan all the questions that was answered by user and calculate the total weight of the platform
        for (var i = 0; i < questionsArraySize; i++) {
            p_budget_percent = p_budget_percent * userAnswersData.questions[i].platforms[j].platform_weight;
        }
        //the name of the platform
        var platform_name = userAnswersData.questions[0].platforms[j].platform_name;
        //update the budget persentage for a specific platform
        pbpResult = await BudgetSchema.updateBudgetPercent(userAnswersData.user_email, platform_name, p_budget_percent);
    }
    return true;
}

//calculate the relative percentage of the total weigth of the platform per each platform and update the parametr in the budget db
//input: user's email, amount of platforms, error array
//output: true on success, else false
async function calculateRelativePercentage(user_email, platformsArraySize, errors) {
    //fetch the relevant budget schema for the user
    var updatedBudget = await BudgetSchema.fetchBudgetData(user_email);
    if (updatedBudget) {
        var p_budget_percent = 0;
        var newPer;
        var pbpResult = 1
        //scan all the platforms. check if the platform was selected for calculations 
        for (var j = 0; j < platformsArraySize && await isPlatformSelected(user_email, updatedBudget.platforms_budget[j].platform_name); j++) {
            //calculate the relative percentage
            p_budget_percent = p_budget_percent + updatedBudget.platforms_budget[j].platform_budget_percent;
        }
        //calculate the relative percentage
        var relativePercentage = 1 / p_budget_percent;
        if (relativePercentage) {
            //scan all the platforms. check if the platform was selected for calculations and later check if the data was updated in the db (on first run it always ok)
            for (var j = 0; j < platformsArraySize && pbpResult && await isPlatformSelected(user_email, updatedBudget.platforms_budget[j].platform_name); j++) {
                newPer = relativePercentage * updatedBudget.platforms_budget[j].platform_budget_percent;
                //the name of the platform
                var platform_name = updatedBudget.platforms_budget[j].platform_name;
                //update the budget persentage for a specific platform
                pbpResult = await BudgetSchema.updateBudgetPercent(user_email, platform_name, newPer);
            }
            return true;
        } else {
            errors.push("can't calculate ralativePercentage or update budget db")
            return false
        }
    } else {
        errors.push("can't fetch budget's data")
        return false
    }
}

//calculate budget distribution per each platform and update the parametr in the budget db
//input: user's email, amount of platforms. error array
//output: true on success, else false
async function calculatePlatformBudget(user_email, platformsArraySize, errors) {
    //fetch the relevant budget schema for the user
    var updatedBudget = await BudgetSchema.fetchBudgetData(user_email);
    if (updatedBudget) {
        //total budget for calculations
        var p_budget = updatedBudget.user_budget;
        //scan all the platforms for each question, check if the platform was selected for calculations
        for (var j = 0; j < platformsArraySize && await isPlatformSelected(user_email, updatedBudget.platforms_budget[j].platform_name); j++) {
            p_budget = updatedBudget.user_budget;
            //calculate budget distribution per each platfor
            var new_budget = p_budget * updatedBudget.platforms_budget[j].platform_budget_percent;
            //the name of the platform
            var platform_name = updatedBudget.platforms_budget[j].platform_name;
            //update the budget for a specific platform
            var pbResult = await BudgetSchema.updateBudget(user_email, platform_name, new_budget);
        }
        return pbResult;
    } else {
        errors.push("can't fetch budget's data")
        return false;
    }
}

//check in selectedPlatform db if the specific platform has been selected for budget calculations
//input: user's email, platform's name
//output: if was choosen - true, else false
async function isPlatformSelected(email, name) {
    var choise = await sPlatformSchema.fetchPlatformSelected(email, name);
    return choise;
}


module.exports = router;

