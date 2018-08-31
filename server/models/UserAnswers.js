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
module.exports.findOrCreateUserAnswer = async function (data) {
  try {
    var userFound = await this.findOne({ "user_email": data.user_email });
    if (userFound) {
      return userFound;
    }
    else {
      //if there is no scema for the user, create one new and insert thre relevant data
      var newDB = new UserAnswersSchemaExport({
        user_email: data.user_email,
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
      if(newDB){
        return newDB;
      }else{
        return false;
      }
    }  
  } catch (err) {
    throw new Error("Error")
  }
}

//create selected platform scheme in the db
//input:  user id and selected platform's data
//output: data on success, else false
module.exports.insertPlatformsData = async function (data, userToUpdate) {
  //console.log("the data is: "+data.user_email);
 // console.log("user: "+userToUpdate);
  var platformIsFound = await surveySchema.fetchPlatformData(data);
  //console.log("found: "+platformIsFound);
  var updated = await this.updatePlatformData(platformIsFound, userToUpdate)
  if (platformIsFound) {
    
  }
  else {
    return false
  }
}


//finf specific user and updata it's selectedplatform data
//input: user's id, platforms data
//output: user's data on success, else false
module.exports.updatePlatformData = async function (platformIsFound, userToUpdate) {
  console.log();
var query = {
 // "questions": [{name: 'answer_id.answer_id'}],
  "user_email":userToUpdate.user_email,
  "questions":{
    $elemMatch:{ "answer_id": input.answer_id}
  }};
 var update = {"$set": { "questions.$[outer].platforms":input.platforms}};
 var options = {upsert: true, arrayFilters:  [{ "outer.answer_id" : input.answer_id }]}
 var updated = await this.findOneAndUpdate(query,update,options)
console.log(updated);
  if (1 == updated.nModified) { //if the data was updated
    return found;
  } else {
    return false;
  }
}