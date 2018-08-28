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

});

var UserAnswersSchemaExport = module.exports = mongoose.model('UserAnswers', UserAnswersSchema);



