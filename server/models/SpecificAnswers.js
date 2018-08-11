var mongoose = require('mongoose');

var SpecificAnswersSchema = mongoose.Schema({
    spec_user_id: { type: String, required: true},
    spec_question_text: { type: [], required: true}, 
    spec_answer_text: { type: [], required: true}, 
 
    // insta_weight: { type: Number, required: true },
    // facebook_ads_weight: { type: Number, required: true},
    // linkedin_weight: { type: Number, required: true},
    // google_search_weight: { type: Number, required: true},
    // google_adds_weight: { type: Number, required: true },
  });
  
  var SpecificAnswersSchemaExport = module.exports = mongoose.model('SpecificAnswers', SpecificAnswers);