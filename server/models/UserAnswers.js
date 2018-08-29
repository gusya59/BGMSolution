var mongoose = require('mongoose');

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
    if(created){
      return created;
    }
    else{
      return false
    }   
}

//check if the user email is un theUserAnswer db, if not, add one
//input:  user email
//output: data on success, else false
module.exports.findOrCreateUserAnswer = async function (data) {
  var userFound = await this.findOne({"user_email": data.user_email});
  console.log(userFound);
  if(userFound){
    return userFound;
  }
  else{
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
    console.log(newDB);
    this.inputData (newDB)
    }
  }   


