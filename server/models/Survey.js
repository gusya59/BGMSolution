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
  var updated = await this.findOneAndUpdate({ "question_id": data.question_id }, { $set: { "question_text": data.question_text } }).sort({ created: -1 });
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

//insert specific data into the db
//input: data
//output: function promise. on success- object that has been created, on fail - false
module.exports.insertDataIntoDB = async function (newQuestion) {
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
  var removed = await this.findOneAndDelete({ question_id: data.question_id }.sort({ created: -1 }))
  return removed;
}

//fetch specific answer data from the db (including the relevant platforms)
//input: answer's id
//output: answer's data on success, else false
module.exports.fetchPlatformData = async function (data) {
  var found = await this.findOne({ "answers.answer_id": data.answer_id }, { answers: { $elemMatch: { answer_id: data.answer_id } } }).sort({ created: -1 });
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
  var found = await this.findOne({ "question_id": data.question_id }).sort({ created: -1 });
  if (found) { //if the data was found
    return found;
  } else {
    return false;
  }
}