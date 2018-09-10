var mongoose = require('mongoose');
var surveySchema = require('../models/Survey')


var UserAnswersSchema = mongoose.Schema({
  user_email: { type: String, required: true },
  questions: {
    type: [{ //all the answered questions
      question_id: { type: String }, //, unique: true
      question_text: { type: String, required: true },
      //all the selected answer
      answer_id: { type: String }, //, unique: true 
      answer_text: { type: String, required: true },
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
  completed:{ type: Boolean, required: true },
  created: { type: Date, default: Date.now() }
});

var UserAnswersSchemaExport = module.exports = mongoose.model('UserAnswers', UserAnswersSchema);

//create selected platform scheme in the db
//input:  user id and selected platform's data
//output: data on success, else false
module.exports.inputData = async function (data) {
  var created = await data.save();
  if (created) {
    return created;
  }
  else {
    return false
  }
}

//check if the user is in theUserAnswer db, if not, add one
//input:  user email, question_id, question_text, answer_id, answer_text
//output: data on success, else false
module.exports.findOrCreateUserAnswer = async function (data, userEmail) {
  try {
    var userFound = await this.findOne({ "user_email": userEmail }).sort({ created: -1 }).limit(1);
      if (userFound && (!userFound.completed)) {
        var created = await this.insertNewAnswer(data, userEmail);
        return created;
      }
      else {
        //if there is no scema for the user, create one new and insert thre relevant data
        var newDB = new UserAnswersSchemaExport({
          user_email: userEmail,
          completed: false,
          questions: [{
            question_id: data.question_id,
            question_text: data.question_text,
            //all the selected answer
            answer_id: data.answer_id,
            answer_text: data.answer_text,
            platforms: [{
              platform_id: false,
              platform_name: false,
              platform_weight: false,
            }]
          }]
        });
        //insert new scheme to the collection
        this.inputData(newDB)
        if (newDB) {
          return newDB;
        } else {
          return false;
        }
      }   
  } catch (err) {
    throw new Error("Error")
  }
}

//input new survey answer for the specific user into user answers db
//input: user's email, question's id and text, answer's id and text
//output: true on success, else false
module.exports.insertNewAnswer = async function (data, userEmail) {
  //create new survey answer for user
  var newAnswerData = new UserAnswersSchemaExport({
    questions: [{
      question_id: data.question_id,
      question_text: data.question_text,
      answer_id: data.answer_id,
      answer_text: data.answer_text,
      platforms: [{
        platform_id: false,
        platform_name: false,
        platform_weight: false,
      }]
    }]
  });
  //find specific user (user_email) in the user answers db and add a new answer for the survey
  var updated = await this.findOneAndUpdate({ "user_email": userEmail }, { upsert: true, $push: { questions: newAnswerData.questions } }).sort({ created: -1 });

  if (updated) { //if the data was updated
    return true;
  } else {
    return false;
  }
}

//fetch the relevant answer's platform data from the survey db and update the user answer's data in the user answers db
//input: data - object from the front end. contains: user_email, question_id, anser_id
//output: on success the function will return the id of the next question that user have to answer on, else false
module.exports.insertPlatformsData = async function (data, userEmail) {
  //fetch specific answer's platform data from Survey db
  var platformIsFound = await surveySchema.fetchPlatformData(data)
  if (platformIsFound) {
    //update user answer's data. find the relevant schema and insert or update it's platforms data
    //on success the function will return the id of the next question that user have to answer on
    var nextQuestion = await this.updatePlatformData(platformIsFound, userEmail)
    if (nextQuestion) {
      if(nextQuestion == 1){
        var updated = await this.findOneAndUpdate({ "user_email": userEmail }, {$set:{"completed":true}}).sort({ created: -1 });
      }
      return nextQuestion;
    }
  }
  return false;
}

//find specific answer_id in user answers scheme and update it's selected platform data 
//input: platforms data fron the survey db, data: contains user's email
//output: on success the function will return the id of the next question that user have to answer on, else false
module.exports.updatePlatformData = async function (platformIsFound, userEmail) {
  //platforms to insert
  var input = platformIsFound.answers[0]

  var query = {
    "user_email": userEmail,
    "questions": {
      $elemMatch: { "answer_id": input.answer_id }
    }
  };
  //the location that need to be updated
  var update = { "$set": { "questions.$[outer].platforms": input.platforms } };
  //array's index
  var options = { arrayFilters: [{ "outer.answer_id": input.answer_id }] };

  var updated = await this.findOneAndUpdate(query, update, options).sort({ created: -1 });
  if (updated) { //if the data was updated
    return platformIsFound.answers[0].next_question;
  } else {
    return false;
  }
}


//find the answers array of the specific user and calculte it's size - gets the amount of platforms 
//input: user's email
//output: the size on success, else undefind. 
module.exports.calculateLength = async function (user_email) {
  var result = (await this.aggregate([
    { "$match": { "user_email": user_email } },
    { '$sort': { 'created': -1 } }, //sort by the date. from the newest to oldest
    { "$project": { "count": { "$size": "$questions" } } }
  ])).map(({ count }) => count)
  if (result) {
    return result[0]
  } else {
    return false
  }

}


//find the newest (last) user answer schema. 
//input: user's email
//output: the schema data as an object on success, else null. 
module.exports.findNewestUserAnswers = async function (user_email) {
  var result = await this.findOne({ user_email: user_email }).sort({ created: -1 })
  //console.log(result);
  if (result) {
    return result
  } else {
    return false
  }
}


