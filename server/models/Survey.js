var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var Platforms = require('../models/Platforms')

//algorithm's db scheme
var SurveySchema = mongoose.Schema({
  question_id: { type: String }, //, unique: true
  question_text: { type: String, required: true }, 
  //answer's object. will contain 4 answers
  answers: { type:
    [{
      answer_id: { type: String}, //, unique: true 
      answer_text: { type: String, required: true }, 
      next_question: { type: String, required: true },
      platforms: {
        type: [{
          platform_id: { type: String, required: true },
          platform_name: { type: String, required: true },
          platform_weight: { type: Number, required: true },
        }]
      }
    }]
  }
});


var SurveySchemaExport = module.exports = mongoose.model('Survey', SurveySchema);


module.exports.inputData = async function (data){
  console.log("the data is: "+data);
  try {
    var created = await data.save()(function (err) {
      if (err){
        console.log("can't input data "+ err);
        return false;
      }
      else{
        console.log("ok "+ created);
        return created;
      }
    })
  }catch (err) {
    throw new Error('cant create a question')
  }
}


