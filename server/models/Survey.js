var mongoose = require('mongoose');
var PlatformsSchema = require('../models/Platforms')

//algorithm's db scheme
var SurveySchema = mongoose.Schema({
  question_id: { type: String }, //, unique: true
  question_text: { type: String, required: true },
  //answer's object. will contain 4 answers
  answers: {
    type:
      [{
        answer_id: { type: String }, //, unique: true 
        answer_text: { type: String, required: true },
        next_question: { type: String, required: true },
        //digital media platforms
        platforms: {
          type: [{
            platform_id: { type: String, required: true },
            platform_name: { type: String, required: true },
            platform_weight: { type: Number, required: true },
          }]
        }
      }]
  },
  created: { type: Date, default: Date.now() }
});


var SurveySchemaExport = module.exports = mongoose.model('Survey', SurveySchema);

//find specific question and update it's text
//input:  the id and the text of specific question
//output: true on success, else false
module.exports.updateQuestion = async function (data) {
  var updated = await this.findOneAndUpdate({ "question_id": data.question_id }, { $set: { "question_text": data.question_text } }, { lean: true }).sort({ created: -1 });
  if (updated) { //if the data was updated
    return true;
  } else {
    return false;
  }
}

//find specific answer and update it's data
//input: question id, answer id and answer's text
//output: true on success, else false
module.exports.updateAnswer = async function (data) {
  var updated = await this.update({ "question_id": data.question_id, "answers.answer_id": data.answer_id }, { $set: { "answers.$.answer_text": data.answer_text } });
  if (updated) { //if the data was updated
    return true;
  } else {
    return false;
  }
}

//find specific platform and update it's weight
//input: specific answer_id, platforms{platform's name, new platform's weight}
//output: true on success, else false
module.exports.updatePlatform = async function (data) {
  var updated = await this.update(
    {
      //find the relevant objects in the sub arrays and there positions in the arrays
      "answers": {
        "$elemMatch": { "answer_id": data.answer_id, "platforms.platform_name": data.platforms.platform_name }
      }
    },
    {
      //update the specific data
      "$set": { "answers.$[outer].platforms.$[inner].platform_weight": data.platforms.platform_weight }
    },
    {
      //filter the array's objects accordingly to their positions in the arrays
      "arrayFilters": [{ "outer.answer_id": data.answer_id }, { "inner.platform_name": data.platforms.platform_name }]
    }
  )

  //update function returns the WriteResult object: WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
  if (1 == updated.nModified) { //if the data was updated
    return true;
  } else {
    return false;
  }
}

//find specific answer and update it's next question
//input:answer id and next question
//output: true on success, else false
module.exports.updateNextQuestion = async function (data) {
  var updated = await this.update(
    {
      //find the relevant objects in the sub arrays and there positions in the arrays
      "answers": {
        "$elemMatch": { "answer_id": data.answer_id}
      }
    },
    {
      //update the specific data
      "$set": { "answers.$[outer].next_question": data.next_question }
    },
    {
      //filter the array's objects accordingly to their positions in the arrays
      "arrayFilters": [{ "outer.answer_id": data.answer_id }]
    }
  )

  //update function returns the WriteResult object: WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
  if (1 == updated.nModified) { //if the data was updated
    return true;
  } else {
    return false;
  }
}

//insert specific data into the db
//input: data
//output:on success- object that has been created, on fail - false
module.exports.insertDataIntoDB = async function (data) {
  //create new schrma
  var newQuestion = new SurveySchemaExport();
  //update question's text
  newQuestion.question_text = data.question_text;
  var found = await this.findOne().sort({ created: -1 });
  if (found) {
    //generate and set the new questin_id accordingly to the privious question. q<number>
    newQuestion.question_id = await this.questionIdGenerator(found.question_id)
  } else {//if not found -> there is no question in the db ->set the question id to q0 -> will be changed to q1
    newQuestion.question_id = await this.questionIdGenerator("q0")
  }

  newQuestion.answers = data.answers;
  //genearte and set an answer id according to the question id. q<number>ans<index in the answer array>7
  //and update answer array data
  for (var i = 0; i < 4; i++) {
    newQuestion.answers[i].answer_id = await this.answerIdGenerator(newQuestion.question_id,i)
    newQuestion.answers[i].answer_text = data.answers[i].answer_text
    newQuestion.answers[i].next_question = "0"
    // answersArray.push(platformObj);
  }

  //  find the amount of platforms
  var platformsAmount = await PlatformsSchema.calculateLength();
  //find the newest (last) platforms. 
  var latestPlatforms = await PlatformsSchema.findNewestPlatforms()
  var platformsArray = []

  //fetch the relevant data: platform id and name and create those platforms data in the budget schema
  for (var i = 0; i < platformsAmount; i++) {
    var platformObj = {
      platform_id: "ppp",
      platform_name: "ppp",
      platform_weight: 0
    }
    //update parametrs
    platformObj.platform_id = latestPlatforms.platforms[i].platform_id;
    platformObj.platform_name = latestPlatforms.platforms[i].platform_name;
    platformObj.platform_weight = 0;
    //push platforms array into the question schema
    platformsArray.push(platformObj);
  }
  //insert platforms into answers array
  for (var j = 0; j < 4; j++) {
    newQuestion.answers[j].platforms = platformsArray;
  }
  var promise = await newQuestion.save(newQuestion).then(result => {
    return result;
  })
  return promise;
}

//delete specific question.
//input: question id
//output: removed object if succeded, null if not
module.exports.deleteQuestion = async function (data) {
  var removed = await this.findOneAndDelete({ question_id: data.question_id })
  return removed;
}

//fetch specific answer data from the db (including the relevant platforms)
//input: answer's id
//output: answer's data on success, else false
module.exports.fetchPlatformData = async function (data) {
  var found = await this.findOne({ "answers.answer_id": data.answer_id }, { answers: { $elemMatch: { answer_id: data.answer_id } } }, { lean: true }).sort({ created: -1 });
  if (found) { //if the data was found
    return found;
  } else {
    return false;
  }
}

//fetch specific question data from the db (including the relevant answers)
//input: question's id
//output: question's data on success, else false
module.exports.fetchQuestionData = async function (data) {
  var found = await this.findOne({ "question_id": data.question_id });
  if (found) { //if the data was found
    return found;
  } else {
    return false;
  }
}

//generate question_id
//input: the latest question's id in the db
//output: new question_id on success, else null
module.exports.questionIdGenerator = async function (latestQuestionId) {
  //cut the string
  var neQuestionId = latestQuestionId.substring(1); //<number>
  //create new question_id
  neQuestionId = "q" + (++neQuestionId) //q<++number>
  //check if the new question_id is unique, if not - increase the number
  while (await this.checkIfThereQuestion(neQuestionId)) {
    var neQuestionId = neQuestionId.substring(1); //<number>
    neQuestionId = "q" + (++neQuestionId) //q<++number>
  }
  return neQuestionId
}

//check if there is question_id like that in the db.
//input: question_id
//output: true on success, else false
module.exports.checkIfThereQuestion = async function (data) {
  var found = await this.findOne({ "question_id": data }, { lean: true });
  if (found === undefined || found === null) { //if the data was found
    return false;
  } else {
    return true;
  }
}

//generate answer_id
//input: the latest answer's id in the db
//output: new answer_id on success, else null
module.exports.answerIdGenerator = async function (questionID,index) {
  //find the newest survey
  // var found = await this.findOne().sort({ created: -1 }).limit(1);
  // console.log(found);
  // if (null == found) {
  //   //if the survey db is empty ant there are no questions
  //   var latestQuestionId = "q1"
  // } else {
  //   var latestQuestionId = found.question_id; //q<number>
  // }
  //cut the string
 // var neQuestionId = latestQuestionId.substring(1);  //<number>
  //create the new aswer_id
  var newAnsId = questionID + "ans" + (index+1) //q<number>ans<index>
  if (newAnsId) { //if the data has been created
    return newAnsId;
  } else {
    return false;
  }
}